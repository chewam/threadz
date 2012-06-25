# THREADZ

mobile networking application

## API

### user
-   POST /api/user/login (String login, String password)
-   GET /api/user/logout ()
-   PUT /api/user (String email, String password)

### thread
-   GET /api/thread ([Int start], [Int limit])
-   PUT /api/thread (String name)
-   DELETE /api/thread (String id)

### thread messages
-   GET /api/thread/message (String id)
-   PUT /api/thread/message (String id, String message)

### thread users
-   GET /api/thread/user (String id)
-   PUT /api/thread/user (String id, String userId)
-   DELETE /api/thread/user (String id, String userId)

## App layouts & views
-   Viewport (layout: card)
    -   User (layout: card)
        -   Login (type: form, route: #login)
        -   Register (type: form, route: #register)
    -   Navigation (layout: navigation)
        -   Threads (type: list, route: #threads)
        -   Messages (type: dataview, route: #thread/:id/messages)
        -   Messenger (type: form, route: #thread/:id/messenger)
        -   Users (layout: card)
            -   ListUsers (type: list, route: #thread/:id/users)
            -   AddUsers (type: list)
    -   Menu (layout: navigation)
        -   Actions (type: panel, route: #menu)
        -   Search (type: list, route: #menu/search)
        -   Detail (type: panel)
        -   Create (type: form, route: #menu/create)
