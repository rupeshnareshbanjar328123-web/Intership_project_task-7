# Intership_project_task-7
project structuer
canary-deployment/
├── app/
│   ├── v1/
│   │   ├── app.js (or app.py)
│   │   └── Dockerfile
│   └── v2/
│       ├── app.js (or app.py)
│       └── Dockerfile
├── k8s/
│   ├── namespace.yaml
│   ├── deployment-v1.yaml
│   ├── deployment-v2.yaml
│   └── service.yaml
├── istio/
│   ├── gateway.yaml
│   ├── virtualservice-initial.yaml
│   ├── virtualservice-canary.yaml
│   └── destinationrule.yaml
└── docs/
    └── canary-strategy.md
