# Task Tracker CLI

Task Tracker CLI is a simple Node.js command-line application for managing tasks with a local JSON file.

## Commands

### Add a task

```bash
node index.js add "Buy groceries"
```

### Update a task

```bash
node index.js update 1 "Buy groceries and cook dinner"
```

### Delete a task

```bash
node index.js delete 1
```

### Mark a task as in progress

```bash
node index.js mark-in-progress 1
```

### Mark a task as done

```bash
node index.js mark-done 1
```

### List all tasks

```bash
node index.js list
```

### List tasks by status

```bash
node index.js list done
node index.js list todo
node index.js list in-progress
```

## Examples

```bash
node index.js add "Learn Node.js"
node index.js add "Build task tracker"
node index.js list
node index.js update 2 "Build task tracker CLI"
node index.js mark-in-progress 1
node index.js mark-done 1
node index.js delete 1
node index.js list done
```

## Status Values

Tasks can have one of these status values:

- `todo`
- `in-progress`
- `done`

## How Tasks Are Stored

Tasks are saved in a `tasks.json` file in the current directory.

Each task includes these properties:

- `id`
- `description`
- `status`
- `createdAt`
- `updatedAt`

If the file does not exist, it is created automatically.

## Notes

- Task IDs are assigned automatically.
- Commands with missing or invalid arguments show an error message.
- The project uses only built-in Node.js modules.