# From wild idea to AI app:
## How Watson Studio can help you rapidly prototype AI solutions
### Smart farm app

IBM Watson Studio has powerful machine learning and deep learning features. But did you know it also has simple tools for quickly training and deploying AI models and for prototyping app code? This example shows you how to train a visual recognition model using the graphical model builder in Watson Studio and then create a web app that uses that model.

This sample demonstrates how to build a web app that uses a visual recognition model to identify farm animals in trail camera images:

<img src="readme-images/train-smart-farm-model.png" width="60%"/>

This sample includes:
- Training data and test images (images from a trail camera)
- A short Python notebook for testing the model 
- A longer Python notebook for prototyping app code
- Python Flask web app code
- Instructions and videos showing how to train and test the visual recognition model in [IBM Watson Studio](https://cloud.ibm.com/catalog/services/watson-studio), how to run the web app on your local computer, and how to push the web app to IBM Cloud

You can complete this sample using the free (Lite) version of these services:
- [IBM Cloud](https://cloud.ibm.com/registration)
- [IBM Watson Studio](https://cloud.ibm.com/catalog/services/watson-studio)
- [IBM Watson Visual Recognition](https://cloud.ibm.com/catalog/services/visual-recognition)
- [Python web app on IBM Cloud](https://cloud.ibm.com/catalog/starters/python) (free for 30 days)

<p>&nbsp;</p>


## Demo video
<a href="https://youtu.be/lJlr_iyUhck"><img src="readme-images/thumbnail-smart-farm-demo-video.png" width="75%"/></a>

<p>&nbsp;</p>

## Instructions
These instructions describe how to build the sample web app with given images for training and testing.

<p>&nbsp;</p>


### Prerequisites

<ol>
<li><p>Sign up for IBM Cloud: <a href="https://www.ibm.com/cloud/">IBM Cloud sign up</a></p></li>
<li><p>Create an instance of the IBM Watson Studio service on IBM Cloud: <a href="https://cloud.ibm.com/catalog/services/watson-studio">IBM Watson Studio</a></p></li>
<li><p>Create a project in Watson Studio:</p>
    <ol>
    <li>Go to https://dataplatform.cloud.ibm.com and log in (if you are not already logged in)</li>
    <li>Click <b>New project</b>, select <b>Visual Recognition</b>, and then follow the prompts to associate needed services with the project: IBM Cloud Object Storage and IBM Watson Visual Recognition.</li>
    </ol>
    <p>See also: <a href="https://dataplatform.cloud.ibm.com/docs/content/getting-started/projects.html">Creating projects</a></li>
<li><p>To be able to run the sample web app on your local computer, <a href="https://www.python.org">install Python</a></p>
    <ul>
    <li>Make sure to have the installer add Python to your environments variables</li>
    <li>Mac users, also install <code>pip</code> by issuing this command: <pre><code>sudo easy_install pip</code></pre></li>
    <li>Mac users, also add your user base binary directory to your path:
        <ol>
        <li>Find the user base binary directory by running this command: <pre><code>python -m site --user-base</code></pre></li>
        <li>Add your user base binary directory, with <code>/bin</code> appended, to the file <code>/etc/paths</code></li>
        </ol>
        <p>See: <a href="https://www.architectryan.com/2012/10/02/add-to-the-path-on-mac-os-x-mountain-lion">Complete instructions</a></p></li>
    </ul></li>
<li>To be able to push the sample web app to IBM Cloud, <a href="https://console.bluemix.net/docs/cli/reference/ibmcloud/download_cli.html#install_use">install the IBM Cloud CLI</a></li>
</ol>

<p>&nbsp;</p>


### Step 1: Collect training and test data

1. <p>Download these eight .zip files to your local computer: <a href="smart-farm-model/training_data">Training data</a></p>
2. <p>Download these 16 images to your local computer: <a href="smart-farm-model/test_images">Test images</a></p>

#### About the sample training data and test images

- The sample training data includes 25 daytime images and 25 nighttime images of four different animals:
- The sample test images are four images that were not part of the training data

<table>
<tr>
  <td><b>Bello (day)</b><br/><img  src="readme-images/bello-day.jpg"  width="100"/></td>
  <td><b>Donkey (day)</b><br/><img src="readme-images/donkey-day.jpg" width="100"/></td>
  <td><b>Pony (day)</b><br/><img   src="readme-images/pony-day.jpg"   width="100"/></td>
  <td><b>Shorty (day)</b><br/><img src="readme-images/shorty-day.jpg" width="100"/></td>
</tr>
<tr>
  <td><b>Bello (night)</b><br/><img  src="readme-images/bello-night.jpg"  width="100"/></td>
  <td><b>Donkey (night)</b><br/><img src="readme-images/donkey-night.jpg" width="100"/></td>
  <td><b>Pony (night)</b><br/><img   src="readme-images/pony-night.jpg"   width="100"/></td>
  <td><b>Shorty (night)</b><br/><img src="readme-images/shorty-night.jpg" width="100"/></td>
</tr>
</table>

#### Tips and comments
- <p>With the IBM Watson Visual Recognition service, you can use images as small as 224 x 224 pixels with no loss of performance.  So, preprocessing training images to be 224 x 224  can make life easier (faster upload times, for example, than when using larger images.)</p>
- <p>The guidelines recommend including at least 50 training images in each class.  However, if you don't have 50 images for one or more classes, try to train the model with what you have, because it might work well enough for you.  (The sample training data here has 20 images for each class.)</p>
- <p>Including a negative class in training isn't always needed.  Experiment to determine what works best for your case.  (This sample does not includes a negative class.)</p>

See: [IBM Watson Visual Recognition guidelines for good training](https://console.bluemix.net/docs/services/visual-recognition/customizing.html#customizing-guidelines-training)

<p>&nbsp;</p>


### Step 2: Create a visual recognition model in your Watson Studio project

1. <p>Click <b>Add to project</b> and then click <b>VISUAL RECOGNITION MODEL</b>.  Follow prompts to associate an instance of the IBM Visual Recognition service with your project.  This opens the visual recognition model builder.</p>
2. <p>Replace the name "Default Custom Model" with a name you choose.</p>
3. <p>In the data panel, drag and drop (or browse for) the two .zip files you downloaded in Step 1.</p>
4. <p>In the data panel, select all of the the .zip files and then click <b>Add to model</b>.</p>
5. <p>Rename each of the classes to remove <code>.zip</code> from the end of the name.</p>
7. <p>Click <b>Train model</b>.</p>

See also: <a href="https://dataplatform.cloud.ibm.com/docs/content/analyze-data/visual-recognition-train.html">Training a visual recognition model</a>

<p>&nbsp;</p>


### Step 3: Test the model in Watson Studio

1. <p>When training is complete, a link to the model details page is given in a message.  Click the link to go to the model details page.  (Alternatively, click on the model name in the <b>Assets</b> page of your project to get to the model details page.)</p>
2. <p>Click the <b>Test</b> tab.</p>
3. <p>Download these test images to your local computer: <a href="smart-farm-model/test_images">Test images</a></p>
4. <p>Drag test images onto the test area for classification.</p>

<p>&nbsp;</p>


### Step 4: Work with your trained model in a notebook in Watson Studio

**Note:**  Both sample notebooks work in the FREE Python 3.5 environment in Watson Studio.

#### 4.1

<ol>
<li><p>Add the first sample notebook, <code>smart-farm-test-notebook</code>, to your project:</p>
    <ol>
    <li>Click <b>Add to project</b> and then click <b>NOTEBOOK</b></li>
    <li>Click the tab labeled <b>From URL</b></li>
    <li>In the box labeled <b>Notebook URL</b>, paste the URL of this sample notebook: <a href="smart-farm-notebooks/smart-farm-test-notebook.ipynb"><code>smart-farm-test-notebook</code></a></li>
    <li>Give the notebook a name</li>
    <li>Click <b>Create Notebook</b></li>
    </ol></li>
<li><p>Paste your model ID and credentials into the notebook:</p>
    <ol>
    <li>From the <b>Services</b> sub-menu of the main, navigation menu, open <b>Watson Services</b> in a new browser tab</li>
      <li>Beside your instance of the IBM Watson Visual Recognition service, click <b>Launch tool</b></li>
      <li>In the <b>Overview</b> tab, scroll down to find the model you created in Step 2, and then copy the model ID</li>
      <li>Paste the model ID in the notebook where needed</li>
      <li>Back in the <b>Credentials</b> tab of the Visual Recognition tool, create some test credentials, and then copy the <code>apikey</code> value</li>
      <li>Paste the apikey in the notebook where needed</li>
    </ol></li>
<li><p>Read, explore, and run the cells of the sample notebook.  Learn how to use the Watson Visual Recognition Python client to classify test images.</p></li>
</ol>

#### 4.2

Repeat the steps in 4.1 with the second sample notebook, <a href="smart-farm-notebooks/smart-farm-app-code-notebook.ipynb"><code>smart-farm-app-code-notebook</code></a>.

In this notebook, you can see some how to define some functions that will be needed in the sample Python web app.

See also:
- [Notebooks in Watson Studio](https://dataplatform.cloud.ibm.com/docs/content/analyze-data/notebooks-parent.html)
- [IBM Watson Visual Recognition API](https://cloud.ibm.com/apidocs/visual-recognition?code=python)

**Demo video**

<a href=""><img src="readme-images/thumbnail-smart-farm-notebook-video.png" width="75%"/></a>

<p>&nbsp;</p>


### Step 5: Copy prototype code into a web app

1. <p>Download and unzip the sample app from here: <a href="smart-farm-web-app/smart-farm-web-app.zip">Sample Python Flask web app</a></p>
2. <p>In the file <code>server.py</code>, paste your model ID and credentials (just like in the sample notebooks)</p>
3. <p>Notice that the functions <code>getKey</code>, <code>getTopClass</code>, and <code>classifyObject</code> that were prototyped in the notebook are used in the file <code>server.py</code></p><img src="readme-images/smart-farm-app-code.png" width="75%"/></a>

#### Sample file highlights
<table>
<tr>
  <th>File</th>
  <th>Description</th>
</tr>
<tr>
  <td><code>server.py</code></td>
  <td>Python Flask server code for the app</td>
</tr>
<tr>
  <td><code>static/index.html</code></td>
  <td>HTML and Javascript (AJAX) for the web page interface of the app</td>
</tr>
<tr>
  <td><code>static/css/styles.css</code></td>
  <td>Controls the appearance of the web page</td>
</tr>
</table>

<p>&nbsp;</p>


### Step 6: Run the app on your local computer

1. Open a command prompt and then navigate to the directory containing the file <code>server.py</code>
2. From the command line, start the Python Flask server by issuing the following command: <pre><code>python server.py</code></pre>
3. Open a web browser to: [http://localhost:8000/](http://localhost:8000)
4. Classify one of the test images

**Demo video**

<a href=""><img src="readme-images/thumbnail-smart-farm-local-video.png" width="75%"/></a>

<p>&nbsp;</p>


### Step 7: Push the app to the public cloud

<ol>
  <li><p>In IBM Cloud, create a Python Flask Cloud Foundry app, size 128 MB: <a href="https://console.bluemix.net/catalog/starters/python">Python Flask starter app</a></p></li>
  <li><p>In the local file named <code>manifest.yml</code>, replace <code>app-name</code> with the name you chose for your Python Flask app starter:
<pre><code>applications:
- name: app-name
  memory: 128M
</code></pre></p></li>
<li><p>In the local file named <code>setup.py</code>, replace <code>app-name</code> with the name you chose for your Python Flask app starter:
<pre><code>setup(
    name='app-name',
    version='1.0.0',
...
</code></pre></p></li>
  <li><p>On the command line, login to your IBM Cloud account by issuing the following command:
<pre><code>ibmcloud login
</code></pre></p></li>
  <li><p>On the command line, target the CloudFoundry API endpoint by issuing the following command:
<pre><code>ibmcloud target --cf
</code></pre></p></li>
  <li><p>On the command line, from the app working directory (where the file server.py is located)
push your app to IBM Cloud by issuing the following command:
<pre><code>ibmcloud app push
</code></pre></p></li>
</ol>

**Demo video**

<a href=""><img src="readme-images/thumbnail-smart-farm-push-video.png" width="75%"/></a>

<p>&nbsp;</p>


=======
<hr>
<p>Copyright © 2019 IBM. This tutorial and its source code are released under the terms of the MIT License.</p>
