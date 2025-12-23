<!-- single page app diagram -->

sequenceDiagram
    participant user
    participant browser
    participant server
    participant API

    Note over user,browser: Initial Page Load
    user->>browser: Navigate to https://studies.cs.helsinki.fi/exampleapp/spa
    browser->>server: GET /exampleapp/spa
    server-->>browser: single HTML file

    Note over browser: HTML parsing & Execution
    browser->>browser: Parse HTML
    browser->>server: GET /exampleapp/main.css
    browser->>server: GET /exampleapp/spa.js
    browser->>server: GET /exampleapp/favicon.ico

    Note over browser,API: SPA initialization
    browser->>browser: Execute spa.js
    browser->>API: GET /exampleapp/data.json
    API-->>browser: JSON response
    browser->>browser: Render notes dynamically

    Note over user,browser: user interaction
    user->>browser: Add new note
    browser->>API: POST /exampleapp/new_note_spa
    API-->>browser: 201 Created
    browser->>browser: Update DOM dynamically
    browser->>browser: Re-render notes list

    Note over iser,browser: Continuous SPA Behavior
    loop user interactions
        user->>browser: Any action
        browser->>API: AJAX/Fetch requests as needed
        API-->>browser: JSON responses
    end
