jhipster 产生ocp openshift 文件

(增加docker.io库by updating /etc/sysconfig/docker):  --add-registry docker.io  
#增加一行
ADD_REGISTRY='--add-registry docker.io'
#增加一行end
 sudo systemctl restart docker
 
sudo -i

mvn -Pprod verify jib:dockerBuild -DskipTests
#mvn -Pprod verify jib:dockerBuild
sudo docker login 
docker image tag vuegatewayv3 robin9999/vuegatewayv3
docker push docker.io/robin9999/vuegatewayv3

cd ocp  
sh ocp-apply.sh
? Which *type* of application would you like to deploy? Microservice application
? Enter the root directory where your gateway(s) and microservices are located ../
1 applications found at C:\java\2020\

? Which applications do you want to include in your configura
tion? MenOnDemand-v3
? Do you want to setup monitoring for your applications ? Yes, for metrics only with Prometheus
JHipster registry detected as the service discovery and configuration provider used by your apps
? Enter the admin password used to secure the JHipster Registry admin
? What should we use for the OpenShift namespace? jhipsterv3
? Which *type* of database storage would you like to use? Persistent Storage
? What should we use for the base Docker repository name? hub.docker.com
? What command should we use for push Docker image to repository? docker push

Checking Docker images in applications directories...
ls: no such file or directory: C:/java/2020/MenOnDemand-v3/target/jib-cache
    force ..\..\..\Users\DONGSHILAI\.yo-rc-global.json
   create ..\ocp\ocp-apply.sh
    force .yo-rc.json
   create ..\ocp\vuegatewayv3\vuegatewayv3-deployment.yml
   create ..\ocp\vuegatewayv3\vuegatewayv3-mysql.yml
   create ..\ocp\registry\scc-config.yml
   create ..\ocp\registry\jhipster-registry.yml
   create ..\ocp\registry\application-configmap.yml
   create ..\ocp\monitoring\jhipster-metrics.yml


WARNING! OpenShift configuration generated, but no Jib cache found
If you forgot to generate the Docker image for this application, please run:
To generate the missing Docker image(s), please run:
  ./mvnw -ntp -Pprod verify jib:dockerBuild in C:\java\2020\MenOnDemand-v3

WARNING! You will need to push your image to a registry. If you have not done so, use the following commands to tag and push the images:
  
  (增加docker.io库by updating /etc/sysconfig/docker):  --add-registry docker.io  
#增加一行
ADD_REGISTRY='--add-registry docker.io'
#增加一行end
 sudo systemctl restart docker

 sudo docker login docker image tag vuegatewayv3 robin9999/vuegatewayv3
  docker push docker.io/robin9999/vuegatewayv3

You can deploy all your apps by running:
  ../ocp/ocp-apply.sh
OR
  oc process -f ../ocp/registry/scc-config.yml | oc apply -f -
  oc process -f ../ocp/monitoring/jhipster-metrics.yml | oc apply -f -
  oc process -f ../ocp/registry/application-configmap.yml | oc apply -f -
  oc process -f ../ocp/registry/jhipster-registry.yml | oc apply -f -
  oc process -f ../ocp/vuegatewayv3/vuegatewayv3-mysql.yml | oc apply -f -
  oc process -f ../ocp/vuegatewayv3/vuegatewayv3-deployment.yml | oc apply -f -

Use these commands to find your application's IP addresses:
  oc get svc vueGatewayv3