sequenceDiagram
    participant User
    participant DOM
    participant Browser
    participant API
    participant DB

    Note over User,Browser: Initial state
    Browser->>Browser: SPA is loaded

    Note over User,DOM: Step 1: User Input
    User->>DOM: Types note content into form input field
    User->>DOM: Clicks "Save" button

    Note over DOM,Browser: Step 2: Event Handling
    DOM->>Browser: Form submit event fired
    Browser->>Browser: event.preventDefault()
    Browser->>Browser: Capture form data

    Note over Browser: Step 3: Create Note Object
    Browser->>Browser: Create newNote object

    Note over Browser,API: Step 4: Send to Server
    Browser->>API: POST /exampleapp/new_note_spa
    Note over Browser,API: Content-Type: application/json<br>Payload: JSON.stringify(newNote)

    API->>API: Validate JSON
    API->>DB: Store note in database
    DB-->>API: Success confirmation

    Note over API,Browser: Step 5: Server Response
    API-->>Browser: HTTP 201 Created

    Note over Browser: Step 6: Update Client State
    Browser->>Browser: Add newNote to notes array

    Note over Browser,DOM: Step 7: Update UI
    Browser->>DOM: Clear form input
    Browser->>DOM: Re-render notes list
    Browser->>DOM: Show success message

    Note over User: Step 8: User sees result
    DOM-->>User: Updated notes list appears
    DOM-->>User: Form is cleared for next note
