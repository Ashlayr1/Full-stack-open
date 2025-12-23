# New Note Diagram

sequenceDiagram
    participant User
    participant Server
    participant Browser

    Note over User,Browser: User Interaction Phase
    User->>Browser: 1. Types "Potato" in text field
    User->>Browser: 2. Clicks "Save" Button

    Note over Browser: Browser Processing Phase
    Browser->>Browser: 3. event.preventDefault()
    Browser->>Browser: 4. Creates JSON: {content: "Potato", date: "2025-12-22"}

    Note over Browser,Server: Network Request Phase
    Browser->>Server: 5. POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server

    Note over Server: Server Processing Phase
    Server->>Server: 6. Validates input
    Server->>Server: 7. Appends to notes array
    Server->>Server: 8. Saves to data.json
    Server->>Browser: 9. HTTP 302 Found
    deactivate server

    Note over Browser: Page Reoload Phase
    Browser->>Server: 10. GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Browser: 11. HTML document
    deactivate Server

    Note over Browser: Browser requests CSS, JavaScript, and data files
    Browser->>Server: 12. GET /main.js
    Browser->>Server: 13. GET /main.css
    Browser->> Server: 14. GET /data.json
    Server-->>Browser: 15. Updated JSON with nex note

    Note over Browser: Final Rendering
    Browser->>Browser: 16. Executes callback function
    Browser->>Browser: 17. Renders all notes including new one

    Note over Uer: User experience
    User->>User: 18 Sees "Potato" in notes list
