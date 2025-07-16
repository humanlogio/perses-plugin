import packageJson from '../package.json';
/**
 * Returns the plugin module information from package.json
 */ export function getPluginModule() {
    const { name, version, perses } = packageJson;
    return {
        kind: 'PluginModule',
        metadata: {
            name,
            version
        },
        spec: perses
    };
}

//# sourceMappingURL=getPluginModule.js.map