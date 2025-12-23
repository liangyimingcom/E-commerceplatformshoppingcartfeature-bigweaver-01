# AWS Amplify Build Warnings - Quick Reference

## Warning 1: Cache Write Error (HTTP 404)

### Warning Message
```
Unable to write cache: {"code":"ERR_BAD_REQUEST","message":"Request failed with status code 404"}
```

### Quick Answer
✅ **This warning is SAFE TO IGNORE for first-time deployments.**

### Why This Warning Appears
AWS Amplify attempts to write build cache (like `node_modules`) to cloud storage. During the **first deployment**, the cache storage endpoint doesn't exist yet, resulting in a 404 error. AWS automatically provisions the cache storage, and subsequent builds will use caching successfully.

### Current Status
- **Timestamp**: 2025-12-21T08:54:34.730Z
- **Application Status**: ✅ Fully Functional
- **Cache Impact**: ⏳ First build slower (no cache) → ✅ Next builds faster (cached)
- **Action Required**: ❌ No

### What Happens Next
1. First build completes successfully (with warning)
2. AWS Amplify provisions cache storage automatically
3. Second and subsequent builds use caching (no warning)
4. Build times improve by ~50% after first build

### For Detailed Information
See [AMPLIFY_CACHE_INVESTIGATION.md](./AMPLIFY_CACHE_INVESTIGATION.md) for:
- Complete technical analysis of cache behavior
- Build time comparisons and metrics
- Cache configuration best practices
- Troubleshooting persistent cache issues
- FAQs and monitoring guidelines

---

## Warning 2: "Failed to set up process.env.secrets"

### Quick Answer
✅ **This warning is SAFE TO IGNORE for this application.**

### Why This Warning Appears
AWS Amplify automatically attempts to load secrets from AWS Systems Manager (SSM) Parameter Store during every build. When no SSM parameters exist at the expected path, this warning is displayed.

### Current Status
- **Application Status**: ✅ Fully Functional
- **SSM Secrets Required**: ❌ No
- **Impact on Functionality**: ⚠️ None
- **Action Required**: ❌ No

### When Would You Need SSM Secrets?
You would only need to configure SSM secrets if you add features requiring:
- Payment processing (Stripe, PayPal API keys)
- Backend API integration (authentication tokens)
- Third-party services (Analytics, monitoring)
- Database connections
- Authentication services (Cognito, Auth0)

### For Detailed Information
See [SSM_SECRETS_INVESTIGATION.md](./SSM_SECRETS_INVESTIGATION.md) for:
- Complete technical analysis
- Step-by-step SSM configuration guide
- Code examples for using secrets
- Security best practices
- Troubleshooting steps

### Expected SSM Path for This App
If you do need to add secrets in the future:
```
/amplify/d39hijjwy5dz8q/ecommerce-shopping-cart-20251221-043801/{PARAMETER_NAME}
```

---

**Last Updated**: 2025-12-21  
**Investigator**: Development Team  
**Status**: Documented and Resolved
