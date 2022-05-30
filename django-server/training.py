import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import r2_score
from sklearn import metrics
import joblib 

df=pd.read_csv('./data/bodyfat.csv')
##DROP DENSITY COLUMN
df=df.drop(columns=df.columns[0])

print(df)
df.head(10)
df.describe().T
df.dtypes
df.isnull().any().any()

import missingno as msno
msno.bar(df)
sns.pairplot(df)
df.corr()
plt.subplots(figsize=(10,10))
sns.heatmap(df.corr(),cmap='RdGy')
fig, ax =plt.subplots(15,1,figsize=(20,100))
x=0
for i in range(0,14):
    sns.countplot(x=df.columns[x],data=df,ax=ax[i]);
    ax[i].set_title(df.columns[x])
    fig.show()
    x+=1
y=np.array(df['BodyFat'])
print(y[:10])
print(y.shape)
x=np.array(df[['Weight','Chest','Abdomen','Hip','Thigh','Knee','Biceps','Neck']])
print(x[0:5])
print(x.shape)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test =  train_test_split(x,y,test_size=0.2)
print("TEST data")
print(X_test)
#do các thuộc tính đầu vào thang đo không đều cần chuẩn hóa về một thang do 
from sklearn.preprocessing import StandardScaler
sc=StandardScaler()
X_train = sc.fit_transform(X_train)
print("@@@@@@@@@@");
print(X_train)
print("@@@@@@@@@@");

X_test=sc.transform(X_test)
print(X_train[0:15])

from sklearn.model_selection import cross_val_score
from sklearn import linear_model
LR_model= linear_model.LinearRegression()
scores = cross_val_score(estimator=LR_model, X=X_train, y=y_train, cv=10)
print("Giá trị trung bình :c",scores.mean())
LR_model.fit(X_train,y_train)
joblib.dump(LR_model,'model/predict_body_fat' + '_model.pkl')
# print("Hệ số góc:",LR_model.coef_)
# print("Hệ số chặn",LR_model.intercept_)
# print("Test input dâta",X_test)
# y_pred = LR_model.predict(X_test)
print('R2:',LR_model.score(X_train, y_train))
# print('MAE:', metrics.mean_absolute_error(y_test, y_pred))
# print('MSE:', metrics.mean_squared_error(y_test, y_pred))
# print('RMSE:', np.sqrt(metrics.mean_squared_error(y_test, y_pred)))