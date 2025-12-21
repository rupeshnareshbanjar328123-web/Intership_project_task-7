# Canary Deployment Strategy Document

## 1. Architecture Overview

This project implements a canary deployment strategy using:
- **K3s**: Lightweight Kubernetes distribution
- **Istio**: Service mesh for traffic management
- **Docker**: Container runtime

### Architecture Diagram
```
Internet → Istio Gateway → Virtual Service (80/20 split)
                              ↓                    ↓
                         Service v1           Service v2
                              ↓                    ↓
                         3 Pods v1            1 Pod v2
```

## 2. Deployment Phases

### Phase 1: Initial State (100% v1)
- All traffic goes to stable version
- 3 replicas of v1 running

### Phase 2: Canary Introduction (80/20)
- Deploy v2 with 1 replica
- Route 20% traffic to canary
- Monitor for 30 minutes
- Success criteria: Error rate < 0.1%, Response time < 200ms

### Phase 3: Gradual Increase (50/50)
- If canary healthy, increase to 50%
- Monitor for 1-2 hours
- Validate performance metrics

### Phase 4: Full Rollout (100% v2)
- Complete traffic shift to v2
- Monitor for 24 hours
- Keep v1 ready for rollback

## 3. Traffic Split Rationale

**Why 80/20?**
- Limits risk to 20% of users
- Sufficient traffic for meaningful metrics
- Easy rollback with minimal impact
- Industry best practice

## 4. Rollback Procedure

### Emergency Rollback (< 5 minutes):
```bash
# Shift 100% traffic back to v1
kubectl apply -f istio/virtual-service-rollback.yaml

# Scale down canary
kubectl scale deployment canary-app-v2 --replicas=0
```

### Rollback Triggers:
- Error rate > 1%
- Response time > 500ms
- Pod crash loops
- User complaints

## 5. Monitoring Approach

### Key Metrics:
- **Request success rate**: > 99.5%
- **Average response time**: < 200ms
- **Error rate**: < 0.1%
- **Pod health**: All running

### Tools:
- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **Kiali**: Service mesh dashboard

## 6. Success Criteria

- Zero downtime during deployment
- Error rate within baseline
- Performance stable or improved
- Successful rollback capability tested

## 7. Risk Mitigation

- Gradual traffic increase
- Real-time monitoring
- Automated health checks
- Quick rollback procedure
- Backward compatibility maintained

---

**Author**: Rupesh Naresh Banjar  
**Date**: December 2025  
**Version**: 1.0
