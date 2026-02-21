# Google Play Store Submission Checklist

## Pre-Submission Requirements

### 1. Google Play Console Account
- [ ] Create Google Play Console account
- [ ] Pay one-time $25 registration fee
- [ ] Complete developer profile

### 2. App Requirements

#### App Identity
- [ ] Unique app ID (package name) - `com.flipdrag.app`
- [ ] App name: "FlipDrag" (or your chosen name)
- [ ] Version code: 1 (increment for each release)
- [ ] Version name: "1.0.0" (user-visible version)

#### App Signing
- [ ] Release keystore created and secured
- [ ] Keystore password stored securely (password manager)
- [ ] Keystore file backed up (cloud + local)
- [ ] Signing configuration tested

#### Build
- [ ] Release AAB built successfully
- [ ] AAB tested on real device
- [ ] All features work correctly
- [ ] No crashes or critical bugs
- [ ] Performance is acceptable

### 3. Store Listing

#### Required Information
- [ ] **App name**: FlipDrag (or your name)
- [ ] **Short description**: 80 characters max
  - Example: "Create and share interactive digital flipbooks. Design, customize, and publish beautiful publications."
- [ ] **Full description**: 4000 characters max
  - Describe features, benefits, use cases
  - Include keywords for search
  - Format with line breaks for readability
- [ ] **App icon**: 512x512px PNG (high-res icon)
- [ ] **Feature graphic**: 1024x500px PNG/JPG
- [ ] **Screenshots**: 
  - [ ] At least 2 phone screenshots (recommended: 4-8)
  - [ ] Tablet screenshots (if app supports tablets)
  - [ ] Show key features and UI

#### Optional but Recommended
- [ ] **Promotional video**: YouTube link (optional)
- [ ] **Promotional graphic**: 180x120px (optional)
- [ ] **App category**: Select appropriate category
- [ ] **Tags**: Add relevant tags for discovery

### 4. Content Rating

- [ ] Complete content rating questionnaire
- [ ] Answer all questions honestly
- [ ] Submit for rating (usually instant)
- [ ] Save rating certificate

**Why**: Required for all apps. Based on your answers, Google assigns a rating (Everyone, Teen, Mature, etc.)

### 5. Privacy Policy

- [ ] **Privacy Policy URL**: Required if app:
  - Collects user data
  - Uses analytics
  - Has user accounts
  - Accesses device features (camera, storage, etc.)

**Your app likely needs this because**:
- User accounts (authentication)
- File uploads (camera, storage access)
- Analytics (PostHog)
- API calls (may collect data)

**Privacy Policy must**:
- Be publicly accessible (HTTPS URL)
- Explain what data you collect
- Explain how you use data
- Explain data sharing (if any)
- Be in language of your target market

**Where to host**:
- Your website: `https://flipdrag.com/privacy`
- Or use a privacy policy generator

### 6. App Access

- [ ] **App availability**: 
  - Select countries/regions
  - Or "Available in all countries"
- [ ] **Pricing**: Free or Paid
- [ ] **In-app purchases**: Configure if applicable

### 7. Preventing "WebView Only" Rejection

**Why**: Google rejects apps that are just a WebView wrapper with no native features.

**Your app avoids this because**:
- ✅ Native file downloads (Filesystem plugin)
- ✅ Camera integration (Camera plugin)
- ✅ Native share dialog (Share plugin)
- ✅ Back button handling (App plugin)
- ✅ Device storage access (Filesystem plugin)
- ✅ Haptic feedback (Haptics plugin)
- ✅ Status bar customization
- ✅ Splash screen

**In Store Listing, emphasize**:
- "Native Android app with offline capabilities"
- "Direct camera integration for photo capture"
- "Native file management and downloads"
- "Optimized for mobile devices"

### 8. Testing

#### Internal Testing
- [ ] Create internal testing track
- [ ] Upload AAB to internal testing
- [ ] Add testers (email addresses)
- [ ] Testers install and test app
- [ ] Fix any issues found

#### Closed Testing (Recommended)
- [ ] Create closed testing track
- [ ] Upload AAB to closed testing
- [ ] Add testers via email or Google Groups
- [ ] Collect feedback
- [ ] Fix issues before public release

#### Open Testing (Optional)
- [ ] Create open testing track
- [ ] Anyone can join and test
- [ ] Good for beta testing

### 9. Production Release

#### Before Submitting
- [ ] All testing complete
- [ ] No critical bugs
- [ ] Privacy policy live and accessible
- [ ] Content rating complete
- [ ] Store listing complete
- [ ] Screenshots and graphics ready
- [ ] App description reviewed for typos

#### Submission
- [ ] Upload AAB to production track
- [ ] Review all information
- [ ] Submit for review

#### Review Process
- **Timeline**: Usually 1-3 days
- **Status**: Check Play Console for updates
- **Possible outcomes**:
  - ✅ Approved: App goes live
  - ⚠️ Rejected: Fix issues and resubmit
  - 📝 More info needed: Provide requested information

### 10. Common Rejection Reasons

#### "WebView Only App"
- **Solution**: Emphasize native features in description
- **Your app**: Already has native features (camera, filesystem, etc.)

#### "Missing Privacy Policy"
- **Solution**: Add privacy policy URL
- **Required**: If app collects any data

#### "Inappropriate Content"
- **Solution**: Ensure content rating is accurate
- **Check**: User-generated content policies

#### "Misleading Description"
- **Solution**: Ensure description matches app functionality
- **Check**: Don't promise features you don't have

#### "Poor Performance"
- **Solution**: Optimize app performance
- **Test**: On low-end devices

#### "Security Issues"
- **Solution**: Use HTTPS for all API calls
- **Check**: No hardcoded secrets in code

### 11. Post-Launch

#### Monitor
- [ ] Check crash reports in Play Console
- [ ] Monitor user reviews
- [ ] Track app performance metrics
- [ ] Respond to user feedback

#### Updates
- [ ] Increment version code for each update
- [ ] Update version name (e.g., 1.0.1)
- [ ] Test updates thoroughly
- [ ] Submit updates through same process

## Quick Submission Checklist

**Must Have**:
1. ✅ Google Play Console account ($25)
2. ✅ Release AAB built and tested
3. ✅ App name and description
4. ✅ App icon (512x512)
5. ✅ Feature graphic (1024x500)
6. ✅ Screenshots (at least 2)
7. ✅ Privacy policy URL
8. ✅ Content rating completed

**Should Have**:
- Multiple screenshots (4-8)
- Tablet screenshots (if applicable)
- Promotional video (optional)
- Complete, detailed description

## Timeline Estimate

- **Setup**: 1-2 hours (first time)
- **Asset creation**: 2-4 hours (design work)
- **Testing**: 1-2 days (thorough testing)
- **Review**: 1-3 days (Google's review)
- **Total**: ~1 week from start to live

## Resources

- [Google Play Console](https://play.google.com/console)
- [Play Store Policies](https://play.google.com/about/developer-content-policy/)
- [App Quality Guidelines](https://developer.android.com/quality)
- [Privacy Policy Requirements](https://support.google.com/googleplay/android-developer/answer/10787469)

## Support

If your app is rejected:
1. Read rejection reason carefully
2. Check Play Store policies
3. Fix the issue
4. Resubmit
5. Contact Play Console support if needed

Good luck with your submission! 🚀


