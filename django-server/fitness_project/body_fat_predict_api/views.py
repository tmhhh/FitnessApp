from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


class UserData:
    def __init__(self,age,weight,height,neck,chest,abdomen,hip,thigh):
        self.age=age
        self.weight=weight
        self.height=height
        self.neck=neck
        self.chest=chest
        self.abdomen=abdomen
        self.hip=hip
        self.thigh=thigh

# Create your views here.
class WeatherNowView(APIView):

    def get(self, request):
        if request.method == "GET":
            import joblib
            model_name = 'predict_body_fat'
            model = joblib.load('../model/' + model_name + '_model.pkl')
            userData= UserData(request.GET.get("age"),request.GET.get("weight"),request.GET.get("height"),request.GET.get("neck"),request.GET.get("chest"),request.GET.get("abdomen"),request.GET.get("hip"),request.GET.get("thigh") )
            #SCALLING
            print([[float(request.GET.get("age")),float(request.GET.get("weight")),float(request.GET.get("height")),float(request.GET.get("neck")),float(request.GET.get("chest")),float(request.GET.get("abdomen")),float(request.GET.get("hip")),float(request.GET.get("thigh"))]])
            from sklearn.preprocessing import StandardScaler
            sc = StandardScaler()
            predictData=sc.fit_transform([[float(request.GET.get("age")),float(request.GET.get("weight")),float(request.GET.get("height")),float(request.GET.get("neck")),float(request.GET.get("chest")),float(request.GET.get("abdomen")),float(request.GET.get("hip")),float(request.GET.get("thigh"))]])
            #
            # #predict
            print(predictData)
            prediction = model.predict(predictData)
            print(prediction)

            return Response({"data":prediction}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Method not allowed"}, status=status.HTTP_400_BAD_REQUEST)

