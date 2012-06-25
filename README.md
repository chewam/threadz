# THREADZ

Threadz is mobile networking application. It allows users to create contacts groups and broadcast messages to everyone in a group.

## SCENARIO
1. A user installs the application.
2. He creates an account.
3. He creates a thread.
4. He adds contacts to this thread.
5. He sends/recieves messages to/from this thread.

## RULES

### user
-   A user can create as many threads as he wishes.
-   A user can look for an existing thread.
-   A user can subscribe to an existing thread.
-   A user can list contact attached to an existing thread.

### admin
-   The creator of a thread is the admin of the thread.
-   An admin can attach contacts to a thread.
-   An admin can dettach contacts from a thread.
-   An admin can accept/decline contact subscription request.

### thread
-   Each message is readable by every contacts attached to a thread.


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

## APP layouts, views & routes
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

## DB Schemas

### user
-   id (Int, primary key)
-   email (Varchar)
-   password (Varchar)
-   creationDate (Date)

### thread
-   id (Int, primary key)
-   name (Varchar)
-   userId (Varchar, foreign key)
-   creationDate (Date)

### message
-   id (Int, primary key)
-   threadId (Int, foreign key)
-   userId (Int, foreign key)
-   text (Text)
-   creationDate (Date)

### userThreads
-   userId (Int, foreign key)
-   threadId (Int, foreign key)
-   creationDate (Date)
-   isGranted (TinyInt)
-   isAdmin (TinyInt)
