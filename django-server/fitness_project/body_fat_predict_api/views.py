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
            prediction="null"
            import pandas as pd
            from sklearn.preprocessing import StandardScaler
            sc = StandardScaler()
            #LOAD DATA
            pd.set_option('display.max_columns',None)
            df=pd.read_csv("../data/bodyfat.csv")    
            dfForPredictDensity=df.drop(["BodyFat","Density"], axis = 1)
            #GET USER DATA
            userWeight=float(request.GET.get("weight"))
            userHeight=float(request.GET.get("height"))
            userAge=float(request.GET.get("age"))
            userNeck=float(request.GET.get("neck"))
            userChest=float(request.GET.get("chest"))
            userAbdomen=float(request.GET.get("abdomen"))
            userHip=float(request.GET.get("hip"))
            userThigh=float(request.GET.get("thigh"))
            userWrist=float(request.GET.get("wrist"))
            userBiceps=float(request.GET.get("biceps"))
            userForearm=float(request.GET.get("forearm"))
            userKnee=float(request.GET.get("knee"))
            userAnkle=float(request.GET.get("ankle"))
            userData= [[userAge,userWeight,userHeight,userNeck,userChest,userAbdomen,userHip,userThigh,userKnee,userAnkle,userBiceps,userForearm,userWrist]]
            tempDf = pd.DataFrame(userData, columns=dfForPredictDensity.columns.values.tolist())
            # dfForPredictDensity = dfForPredictDensity.append(tempDf, ignore_index=True)
            scale_fit=sc.fit(dfForPredictDensity)
            predictData=scale_fit.transform(userData)
            import joblib
            #PREDICT DENSITY OF USER
            model_name="predict_density2"
            model = joblib.load('../model/' + model_name + '_model.pkl')
            userDensity=model.predict(predictData);
            
     
            #PREDICT BODY FAT
            df=df.drop(["BodyFat"], axis = 1)
            # userData=userData[0].insert(0,userDensity)
            userDensity=userDensity[0]
            print("User density")
            print(userDensity)
            userData= [[userDensity,userAge,userWeight,userHeight,userNeck,userChest,userAbdomen,userHip,userThigh,userKnee,userAnkle,userBiceps,userForearm,userWrist]]
            # tempDf = pd.DataFrame(userData, columns=df.columns.values.tolist())
            print(tempDf)
            # df = df.append(tempDf, ignore_index=True)
            scale_fit=sc.fit(df)
            predictData=scale_fit.transform(userData)
            print("predict data /n",predictData)
            model_name = 'predict_body_fat2'
            model = joblib.load('../model/' + model_name + '_model.pkl')
            prediction = model.predict(predictData)
            # print(prediction)
            return Response({"data":prediction}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Method not allowed"}, status=status.HTTP_400_BAD_REQUEST)

