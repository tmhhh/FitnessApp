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
X=df.drop(["BodyFat","Density"], axis = 1)
y=df.Density
print(y)
print(df)
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
print(model , 'accuracy',LR_model.score(X_test,y_test)) # 99.5%
import joblib 

joblib.dump(LR_model,'model/predict_density' + '_model.pkl')

# y_pred = LR_model.predict(X_test)
y_pred = LR_model.predict(X) 

print(y_pred)


###
from sklearn.ensemble import ExtraTreesRegressor
selection = ExtraTreesRegressor()
selection.fit(X_train,y_train)
print(selection , 'accuracy',selection.score(X_test,y_test)) # 99.5%
joblib.dump(selection,'model/predict_density2' + '_model.pkl')

from sklearn.ensemble import RandomForestRegressor
model=RandomForestRegressor()
RDF_model=model.fit(X_train,y_train)
print(model , 'accuracy',RDF_model.score(X_test,y_test)) # 99.5%
joblib.dump(RDF_model,'model/predict_density3' + '_model.pkl')


##
from sklearn.linear_model import Lasso
model=Lasso(alpha=0.5)
model.fit(X_train,y_train)
print(model , 'accuracy',model.score(X_test,y_test)) # 99.5%

from sklearn.linear_model import Ridge
model=Ridge(alpha=0.5)
model.fit(X_train,y_train)
print(model , 'accuracy',model.score(X_test,y_test)) # 99.5%


from sklearn.tree import DecisionTreeRegressor
DT_model=DecisionTreeRegressor()
DT_model.fit(X_train,y_train)
print(DT_model , 'accuracy',DT_model.score(X_test,y_test)) # 99.5%
