import pandas as pd
pd.set_option('display.max_columns',None)
import numpy as np
import matplotlib.pyplot as plt 
import seaborn as sns
sns.set(style='whitegrid',color_codes=True)
import warnings
warnings.filterwarnings('ignore')
plt.rcParams['figure.figsize']=(10,7)

df=pd.read_csv("./data/bodyfat.csv")

df.head()
print(df.shape)
df.info()
print(df.columns)
df.describe()
plt.figure(figsize=(15,15))
sns.heatmap(df.corr(),annot=True,cmap='RdYlGn',linewidths=2,linecolor='orange',annot_kws={'size':8,'color':'black'},fmt='.4f',square=True)
X=df.drop(["BodyFat"], axis = 1)
y=df.BodyFat
from sklearn.preprocessing import StandardScaler
SC=StandardScaler()
X=SC.fit_transform(X)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 42)
print(X_train.shape) 
print(X_test.shape)

from sklearn.linear_model import LinearRegression
model=LinearRegression()
LR_model=model.fit(X_train,y_train)
print(model , 'accuracy',LR_model.score(X_test,y_test))
import joblib 

joblib.dump(LR_model,'model/predict_body_fat2' + '_model.pkl')

y_pred = LR_model.predict(X_test)
print(y_pred)