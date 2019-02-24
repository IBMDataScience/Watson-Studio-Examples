## 1. Run the app locally

1.1 Install the dependencies listed in the requirements.txt file by issuing the 
following command:
```
pip install -r requirements.txt
```

1.2 Update server.py with your Visual Recognition apikey and model id:
```
model_id = "" # Paste your model id here
api_key  = "" # Paste your apikey here
```

1.3 Run the app on your local machine by issuing th following command:
```
python server.py
```

1.4 View your app in a browser: http://localhost:8000



## 2. Create a new Python Flask app starter in IBM Cloud:

https://console.bluemix.net/catalog/starters/python



## 3. Prepare the local app code for deployment

3.1 Update manifest.yml.

Replace 'app-name' with the app name you chose for your Python Flask app starter:
```
applications:
- name: app-name
  memory: 128M
```

3.2 Update setup.py.

Replace 'app-name' with the app name you chose for your Python Flask app starter:
```
setup(
    name='app-name',
    version='1.0.0',
```



## 4. Deploy the app

4.1 Login to your IBM Cloud account by issuing the following command:
```
bx login
```

4.2 Target the CloudFoundry API endpoint by issuing the following command:
```
bx target --cf
```

4.3 From within the app working directory (where the file server.py is located)
push your app to IBM Cloud by issuing the following command:
```
bx app push
```
