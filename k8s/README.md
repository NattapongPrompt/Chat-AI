# Kubernetes Deployment Guide

## Prerequisites
- Kubernetes cluster (minikube, GKE, EKS, etc.)
- kubectl installed and configured
- Docker images built and pushed to registry

## Deployment Steps

1. Build and push Docker images:
```bash
docker build -t your-registry/backend:latest ./backend
docker build -t your-registry/frontend:latest ./frontend
docker push your-registry/backend:latest
docker push your-registry/frontend:latest
```

2. Apply Kubernetes configurations:
```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml
```

3. Verify deployment:
```bash
kubectl get pods
kubectl get services
kubectl get ingress
```

4. Access the application:
- Update your /etc/hosts with cluster IP and chat.example.com
- Visit https://chat.example.com in your browser

## Maintenance
- Scale deployments:
```bash
kubectl scale deployment backend --replicas=5
kubectl scale deployment frontend --replicas=5
```

- View logs:
```bash
kubectl logs -f <pod-name>
```

- Update deployment:
```bash
kubectl set image deployment/backend backend=your-registry/backend:new-version
kubectl set image deployment/frontend frontend=your-registry/frontend:new-version
