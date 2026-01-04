# ASE-2025-Group-1 - Applied Software Engineering Project

+---src
|   +---app
|   |   |   favicon.svg
|   |   |   globals.css
|   |   |   layout.tsx
|   |   |   page.tsx
|   |   |
|   |   +---admin
|   |   |   \---dashboard
|   |   |       |   page.tsx
|   |   |       |
|   |   |       \---components
|   |   |               ImpactTab.tsx
|   |   |               InventoryTab.tsx
|   |   |               UserDetailsModal.tsx
|   |   |               UsersTab.tsx
|   |   |
|   |   +---api
|   |   |   +---admin
|   |   |   |   +---charities
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   +---dashboard
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   \---inventory
|   |   |   |       |   route.ts
|   |   |   |       |
|   |   |   |       \---analytics
|   |   |   |               route.ts
|   |   |   |
|   |   |   +---auth
|   |   |   |   +---charity-login
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   +---logout
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   \---reset
|   |   |   |       +---confirm
|   |   |   |       |       route.ts
|   |   |   |       |
|   |   |   |       +---request
|   |   |   |       |       route.ts
|   |   |   |       |
|   |   |   |       +---resend
|   |   |   |       |       route.ts
|   |   |   |       |
|   |   |   |       \---verify
|   |   |   |               route.ts
|   |   |   |
|   |   |   +---charity
|   |   |   |   +---analytics
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   +---donations
|   |   |   |   |   |   route.ts
|   |   |   |   |   |
|   |   |   |   |   \---[requestId]
|   |   |   |   |       \---items
|   |   |   |   |               route.ts
|   |   |   |   |
|   |   |   |   \---inventory
|   |   |   |       |   route.ts
|   |   |   |       |
|   |   |   |       +---chart
|   |   |   |       |       route.ts
|   |   |   |       |
|   |   |   |       \---drafts
|   |   |   |           |   route.ts
|   |   |   |           |
|   |   |   |           \---[draftId]
|   |   |   |               |   route.ts
|   |   |   |               |
|   |   |   |               +---add
|   |   |   |               |       route.ts
|   |   |   |               |
|   |   |   |               +---cancel
|   |   |   |               |       route.ts
|   |   |   |               |
|   |   |   |               \---remove
|   |   |   |                       route.ts
|   |   |   |
|   |   |   +---charity-application
|   |   |   |       route.ts
|   |   |   |
|   |   |   +---charity-applications
|   |   |   |   |   route.ts
|   |   |   |   |
|   |   |   |   +---complete-signup
|   |   |   |   |   |   route.ts
|   |   |   |   |   |
|   |   |   |   |   \---validate
|   |   |   |   |           route.ts
|   |   |   |   |
|   |   |   |   \---[id]
|   |   |   |           route.ts
|   |   |   |
|   |   |   +---contact
|   |   |   |       route.ts
|   |   |   |
|   |   |   +---debug
|   |   |   |   \---session
|   |   |   |           route.ts
|   |   |   |
|   |   |   +---donation-requests
|   |   |   |   |   route.ts
|   |   |   |   |
|   |   |   |   \---[id]
|   |   |   |       |   route.ts
|   |   |   |       |
|   |   |   |       +---accept
|   |   |   |       |       route.ts
|   |   |   |       |
|   |   |   |       +---decline
|   |   |   |       |       route.ts
|   |   |   |       |
|   |   |   |       \---items
|   |   |   |               route.ts
|   |   |   |
|   |   |   +---donor
|   |   |   |   \---analytics
|   |   |   |           route.ts
|   |   |   |
|   |   |   +---getname
|   |   |   |       route.ts
|   |   |   |
|   |   |   +---impact
|   |   |   |   +---charities
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   +---charity
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   +---donor
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   +---donors
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   +---live
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   \---platform
|   |   |   |           route.ts
|   |   |   |
|   |   |   +---login
|   |   |   |       route.ts
|   |   |   |
|   |   |   +---resend-otp
|   |   |   |       route.ts
|   |   |   |
|   |   |   +---settings
|   |   |   |   +---me
|   |   |   |   |       route.ts
|   |   |   |   |
|   |   |   |   \---password
|   |   |   |           route.ts
|   |   |   |
|   |   |   +---signup
|   |   |   |       route.ts
|   |   |   |
|   |   |   +---support-chat
|   |   |   |       route.ts
|   |   |   |
|   |   |   +---users
|   |   |   |   |   route.ts
|   |   |   |   |
|   |   |   |   \---[id]
|   |   |   |           route.ts
|   |   |   |
|   |   |   \---verify-otp
|   |   |           route.ts
|   |   |
|   |   +---auth
|   |   |   +---charity-application
|   |   |   |   |   page.tsx
|   |   |   |   |
|   |   |   |   \---application-successful
|   |   |   |           page.tsx
|   |   |   |
|   |   |   +---charity-signup
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---login
|   |   |   |       page.tsx
|   |   |   |
|   |   |   +---reset
|   |   |   |   +---new-password
|   |   |   |   |       page.tsx
|   |   |   |   |
|   |   |   |   +---request
|   |   |   |   |       page.tsx
|   |   |   |   |
|   |   |   |   \---verify
|   |   |   |           page.tsx
|   |   |   |
|   |   |   +---signup
|   |   |   |       page.tsx
|   |   |   |
|   |   |   \---verify
|   |   |           page.tsx
|   |   |
|   |   +---charity
|   |   |   \---dashboard
|   |   |       |   page.tsx
|   |   |       |
|   |   |       \---tabs
|   |   |               CharityDonationsTab.tsx
|   |   |               CharityHomeTab.tsx
|   |   |               CharityInventoryTab.tsx
|   |   |
|   |   +---donor
|   |   |   \---dashboard
|   |   |       |   page.tsx
|   |   |       |
|   |   |       +---components
|   |   |       |       DonorHomeTab.tsx
|   |   |       |
|   |   |       \---tabs
|   |   |               DonorDonationsTab.tsx
|   |   |               DonorHomeTab.tsx
|   |   |
|   |   \---privacy
|   |           page.tsx
|   |
|   +---components
|   |   |   ChatWidget.tsx
|   |   |   impactPreview.tsx
|   |   |   loginButton.tsx
|   |   |   signupButton.tsx
|   |   |
|   |   +---charity
|   |   |   |   CharityImpactCards.tsx
|   |   |   |
|   |   |   +---donations
|   |   |   |       charityDonationHistoryModal.tsx
|   |   |   |       charityViewDonationRequestModal.tsx
|   |   |   |
|   |   |   \---inventory
|   |   |           drafts.tsx
|   |   |           imageSlider.tsx
|   |   |           inventory.tsx
|   |   |           inventoryChart.tsx
|   |   |           viewDraftModal.tsx
|   |   |
|   |   +---donor
|   |   |       DonorImpactCards.tsx
|   |   |
|   |   +---forms
|   |   |       input.tsx
|   |   |       password-fields.tsx
|   |   |       passwordInput.tsx
|   |   |
|   |   +---modals
|   |   |       confirmMessageModal.tsx
|   |   |       donationRequestModal.tsx
|   |   |       viewDonationRequestModal.tsx
|   |   |
|   |   +---settings
|   |   |       AccountSettings.tsx
|   |   |
|   |   \---UI
|   |           dashboard-layout.tsx
|   |           SustainWearLogo.tsx
|   |
|   +---generated
|   |   \---prisma
|   |       |   client.d.ts
|   |       |   client.js
|   |       |   default.d.ts
|   |       |   default.js
|   |       |   edge.d.ts
|   |       |   edge.js
|   |       |   index-browser.js
|   |       |   index.d.ts
|   |       |   index.js
|   |       |   package.json
|   |       |   query_engine-windows.dll.node
|   |       |   query_engine-windows.dll.node.tmp27452
|   |       |   query_engine-windows.dll.node.tmp29972
|   |       |   query_engine_bg.js
|   |       |   query_engine_bg.wasm
|   |       |   schema.prisma
|   |       |   wasm-edge-light-loader.mjs
|   |       |   wasm-worker-loader.mjs
|   |       |   wasm.d.ts
|   |       |   wasm.js
|   |       |
|   |       \---runtime
|   |               edge-esm.js
|   |               edge.js
|   |               index-browser.d.ts
|   |               index-browser.js
|   |               library.d.ts
|   |               library.js
|   |               react-native.js
|   |               wasm-compiler-edge.js
|   |               wasm-engine-edge.js
|   |
|   +---lib
|   |   |   email.ts
|   |   |   impact.ts
|   |   |   prisma.ts
|   |   |   types.ts
|   |   |   validation.ts
|   |   |
|   |   \---cloud
|   |           cloud.ts
|   |           cloudClient.ts
|   |
|   \---types
|           donation.ts
|           sgv.d.ts
|
+---tests
|       setup.ts
|       styleMock.js
|
\---__tests__
    \---validation
        +---auth
        |       resetConfirm.test.ts
        |
        +---password
        |       password.test.ts
        |
        \---signup
                signup.test.ts
