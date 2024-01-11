import Plugins from "~plugins";

const PLUGINS = [
    require("./Anammox").default,
    require("./Classify").default,
    require("./ColorMessage").default,
    require("./HistoryModal").default,
    require("./ImageLink").default,
    require("./ReplyTimestamp").default,
    require("./WebpackTarball").default,
];

const name = Symbol("98VencordPlugins");
export default { name };

// This is called from api/Badges.ts, which is the first place that imports ~plugins
Set = new Proxy(Set, {
    construct(target, args) {
        if(Plugins && Plugins[name]) {
            Set = target;
            delete Plugins[name];
            for(const plugin of PLUGINS)
                Plugins[plugin.name] = plugin;
        }
        return Reflect.construct(target, args);
    }
});
