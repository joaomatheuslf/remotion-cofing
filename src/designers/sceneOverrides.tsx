import React from "react";
import type {Scene, SceneKind} from "../engine/types";
import type {DesignerId} from "./types";

export type DesignerSceneRenderer = React.ComponentType<{scene:Scene}>;

export type DesignerSceneOverrideMap = Partial<
  Record<SceneKind, DesignerSceneRenderer>
>;

/**
 * Designers podem substituir cenas específicas sem alterar o core.
 *
 * Exemplo futuro:
 *
 * const editorialTitle: DesignerSceneRenderer = ({scene}) => ...
 *
 * export const designerSceneOverrides = {
 *   "editorial-pop": {
 *     title: editorialTitle
 *   }
 * };
 */
export const designerSceneOverrides: Partial<
  Record<DesignerId, DesignerSceneOverrideMap>
> = {};

export const getDesignerSceneOverride = (
  designerId: DesignerId,
  sceneKind: SceneKind
): DesignerSceneRenderer | undefined =>
  designerSceneOverrides[designerId]?.[sceneKind];
