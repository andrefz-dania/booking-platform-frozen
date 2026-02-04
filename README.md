## DB structure

### members
connects to other DB

- memberNo
- clubNo
- name
- postcode

### users

- userID - links to memberNo
    Populate rest from other table
- password
- email
- admin/permissions

### events

- ID
- creator
- title
- desc
- price
- public signups 1/0

### signups

- ID
- memberNo
- event ID
- payment info



