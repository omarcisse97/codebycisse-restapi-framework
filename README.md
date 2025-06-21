# codebycisse-restapi-framework

# Dynamic Module Server

A modular Node.js server backend that dynamically creates routes and manages modules through a namespace-based architecture. Built with Express.js and PostgreSQL.

## 🚀 Features

- **Dynamic Route Generation** - Routes are automatically created based on module configurations
- **Namespace-Based Architecture** - Organize modules into logical namespaces
- **Hot Module Registration** - Add new modules without changing core server code
- **Admin Panel** - Built-in admin authentication and management interface
- **Database Integration** - PostgreSQL connection management with dynamic queries
- **REST API Support** - Full CRUD operations with configurable endpoints
- **Page Factory System** - Dynamic HTML page generation for admin interfaces

## 📁 Project Structure

```
server/
├── app/
│   ├── code/                    # Module namespaces
│   │   ├── Auth/               # Authentication modules
│   │   ├── RestAPI/            # REST API modules
│   │   ├── DatabaseManagement/ # Database CRUD modules
│   │   ├── System/             # Core system modules
│   │   └── DatabaseConnection/ # Database connection modules
│   └── public/                 # Static assets
├── util/
│   ├── config.js              # Configuration utilities
│   └── ModuleManager.js       # Module management system
├── jobs/
│   └── createAdmin.js         # Admin creation script
├── server.js                  # Main server entry point
└── .env                       # Environment variables
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/omarcisse97/codebycisse-restapi-framework.git
   cd codebycisse-restapi-framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   DB_USER=your_db_user
   DB_HOST=localhost
   DB_DATABASE=your_database
   DB_PASSWORD=your_password
   DB_PORT=5432
   POSTGRES=postgresql://user:pass@localhost:5432/database
   SERVER=http://localhost:8080
   ADMIN_SECRET=your-secret-key
   APP_VERSION=1.0.0
   APP_NAME=Server
   ```

4. **Create an admin user**
   ```bash
   npm run create-admin -- -u admin@admin.com -p yourpassword -a true
   ```

5. **Start the server**
   ```bash
   npm start
   ```

## 📦 Module System

### Creating a New Module

1. **Create namespace directory** in `app/code/YourNamespace/`

2. **Create registration file** (`register.js`):
   ```javascript
   import path from 'path';
   import { fileURLToPath } from 'url';

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

   const Registration = () => {
       return {
           _namespace: 'YourNamespace',
           _modules: {
               YourModule: {
                   _moduleName: 'Your Module Name',
                   _modulePath: path.join(__dirname, 'YourModule'),
                   _controller: path.join(__dirname, 'YourModule', 'Controller', 'controller.js'),
                   _publicRoute: 'your/route/:handle',
                   _postRoute: 'your/route/:handle',
                   _putRoute: 'your/route/:handle',
                   _deleteRoute: 'your/route/:handle',
                   _displayInModules: "true"
               }
           }
       }
   }
   export default Registration;
   ```

3. **Create module directory structure**:
   ```
   YourNamespace/
   ├── register.js
   └── YourModule/
       ├── Controller/
       │   └── controller.js
       ├── Model/
       │   └── model.js
       └── View/
           └── template.js
   ```

4. **Restart the server** to register the new module

### Module Configuration Options

| Property | Description | Required |
|----------|-------------|----------|
| `_moduleName` | Display name for the module | ✅ |
| `_modulePath` | Absolute path to module directory | ✅ |
| `_controller` | Path to controller file | ✅ |
| `_publicRoute` | GET route pattern | ❌ |
| `_postRoute` | POST route pattern | ❌ |
| `_putRoute` | PUT route pattern | ❌ |
| `_deleteRoute` | DELETE route pattern | ❌ |
| `_displayInModules` | Show in admin module list | ❌ |

## 🎮 Module Manager Usage

Access modules programmatically using the ModuleManager:

```javascript
import ModuleManager from './util/ModuleManager.js';

const moduleManager = new ModuleManager();
await moduleManager.initModules();

// Get all modules
const modules = await moduleManager.getModules();

// Get specific namespace
const namespace = await moduleManager.getNamespace('RestAPI');

// Get specific module
const module = await moduleManager.getModuleFromNamespace('Suppliers', 'RestAPI');
```

## 🗄️ Database Integration

### Built-in Database Modules

- **PostgreSQL Connection** - `DatabaseConnection/Postgres`
- **Dynamic CRUD Operations** - `DatabaseManagement/*`
- **SQL Data Models** - Automatic table management

### Using Database Connections

```javascript
import { DbConn } from "./configDB.js";
import { SQLData } from "../Model/model.js";

const dbConn = await DbConn();
await dbConn.module.connect();

const database = new SQLData(dbConn.module);
await database.init();
```

## 🎨 Page Factory System

Create dynamic admin pages using the built-in PageFactory:

```javascript
import PageFactory from "./PageFactory.js";

const pageFactory = await PageFactory();
pageFactory.module.setTitle('Page Title');
pageFactory.module.setHeader(navigation, userSession);
pageFactory.module.addContent('<h1>Dynamic Content</h1>');
pageFactory.module.setFooter();
pageFactory.module.save();

return resolution.send(pageFactory.module.getTemplate());
```

## 🔐 Authentication

### Admin Panel Access
- Navigate to `/admin/login`
- Use credentials created with `npm run create-admin`
- Session-based authentication with secure cookies

### API Authentication
- API key management at `/api/keys`
- Create, manage, and revoke API keys
- Configurable access levels (read, update, delete)

## 🌐 API Endpoints

### Built-in REST APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/keys` | GET | Manage API keys |
| `/api/suppliers/:handle` | GET,POST,PUT,DELETE | Supplier management |
| `/database-management` | GET | Database admin interface |
| `/admin/login` | GET,POST | Admin authentication |

## 🚀 Deployment

### Railway Deployment

1. **Set production session settings**:
   ```javascript
   app.use(session({
     secret: process.env.ADMIN_SECRET,
     cookie: {
       secure: process.env.NODE_ENV === 'production',
       maxAge: 24 * 60 * 60 * 1000
     }
   }));
   ```


### Environment Variables for Production

```env
NODE_ENV=production
PORT=8080
DATABASE_URL=postgresql://username:password@host:port/database
ADMIN_SECRET=your-super-secret-key
SERVER_URL=https://your-app.railway.app
```

## 📖 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server |
| `npm run create-admin` | Create admin user |

## 🤝 Contributing

1. Create new modules in appropriate namespaces
2. Follow the module registration pattern
3. Use PageFactory for admin interfaces
4. Implement proper error handling
5. Test with sample data

## 📄 License

MIT License

## 🆘 Support

- Check server logs for module registration issues
- Ensure proper directory structure for new modules
- Restart server after adding new modules
- Use ErrorTemplate for consistent error pages