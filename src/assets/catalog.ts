import type {ResolvedAsset} from "./types";

export const assetCatalog:Record<string,ResolvedAsset> = {
  "presenter.joao.suit":{key:"presenter.joao.suit",source:"plugin",uri:"plugin://assets/host/joao-reference-suit.png"},
  "presenter.joao.casual":{key:"presenter.joao.casual",source:"plugin",uri:"plugin://assets/host/joao-reference-orange-polo.png"},
  "icon.database":{key:"icon.database",source:"fallback",uri:"emoji://🗄️"},
  "icon.server":{key:"icon.server",source:"fallback",uri:"emoji://🖥️"},
  "icon.cloud":{key:"icon.cloud",source:"fallback",uri:"emoji://☁️"},
  "icon.lock":{key:"icon.lock",source:"fallback",uri:"emoji://🔒"},
  "icon.brain":{key:"icon.brain",source:"fallback",uri:"emoji://🧠"},
  "icon.document":{key:"icon.document",source:"fallback",uri:"emoji://📄"},
  "icon.phone":{key:"icon.phone",source:"fallback",uri:"emoji://📱"},
};
