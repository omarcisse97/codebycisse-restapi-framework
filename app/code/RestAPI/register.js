import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Registration = () => {
    return {
        _namespace: 'RestAPI',
        _modules: {
            ApiKeyManagement: {
                _moduleName: 'Api Key Management',
                _modulePath: path.join(__dirname, 'ApiKeyManagement'),
                _controller: path.join(__dirname, 'ApiKeyManagement', 'Controller', 'controller.js'),
                _publicRoute: 'api/keys',
                _displayInModules: "true"
            },
            KeyUpdates: {
                _moduleName: 'KeyUpdates',
                _publicRoute: '',
                _modulePath: path.join(__dirname, 'KeyUpdates'),
                _controller: path.join(__dirname, 'KeyUpdates', 'Controller', 'controller.js'),
                _postRoute: 'api/keys/update/:type/:handle',
                _displayInModules: "false"
            },
            //Api route tests for sample
            Suppliers: {
                _moduleName: 'Suppliers',
                _modulePath: path.join(__dirname, 'Suppliers'),
                _controller: path.join(__dirname, 'Suppliers', 'Controller', 'controller.js'),
                _publicRoute: 'api/suppliers/:handle',
                _postRoute: 'api/suppliers',
                _putRoute: 'api/suppliers/:handle',
                _deleteRoute: 'api/suppliers/:handle',
                _displayInModules: "false"
            }
            // Jobs: {
            //     _moduleName: 'Jobs',
            //     _modulePath: path.join(__dirname, 'Jobs'),
            //     _controller: path.join(__dirname, 'Jobs', 'Controller', 'controller.js'),
            //     _publicRoute: 'api/jobs',
            //     _displayInModules: "false"
            // },
            // Shipments: {
            //     _moduleName: 'Shipments',
            //     _modulePath: path.join(__dirname, 'Shipments'),
            //     _controller: path.join(__dirname, 'Shipments', 'Controller', 'controller.js'),
            //     _publicRoute: 'api/shipments',
            //     _displayInModules: "false"
            // },
            // Parts: {
            //     _moduleName: 'Parts',
            //     _modulePath: path.join(__dirname, 'Parts'),
            //     _controller: path.join(__dirname, 'Parts', 'Controller', 'controller.js'),
            //     _publicRoute: 'api/parts',
            //     _displayInModules: "false"
            // }

            //end Api route tests for sample

            // Add more API modules here as needed, following the same pattern
            // Example:
            // ModuleApi: {
            //     _moduleName: 'ModuleApiName',
            //     _modulePath: path.join(__dirname, 'ModuleApiNameDirectory'),
            //     _controller: path.join(__dirname, 'ModuleApiNameDirectory', 'Controller', 'controller.js'),
            //     _publicRoute: 'module_api_route',
            //     _displayInModules: "false"
            // },



        }
    }

}
export default Registration;