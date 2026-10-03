import React from "react";
import {PixelScene} from "../pixel/PixelScene";
import {designerPixelNight} from "../engine/designerDemo";
import {AbsoluteFill, Series, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {DesignerProvider, useDesigner} from "./DesignerProvider";
import {listDesigners} from "./registry";
import {DesignerDefinition} from "./types";
import {BigTitle, Panel, Tag} from "../components/ui";
import {theme} from "../engine/theme";

const Preview: React.FC<{designer:DesignerDefinition; index:number}> = ({
  designer,
  index,
}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const p=spring({
    frame:frame-8,
    fps,
    config:{damping:14,stiffness:170,mass:.8},
  });

  if(designer.id==="pixel-night")return <PixelScene scene={designerPixelNight.scenes[0]}/>;
  return (
    <DesignerProvider designerId={designer.id}>
      <AbsoluteFill style={{
        background:theme.backgrounds.scene,
        padding:52,
        color:theme.colors.text,
        fontFamily:theme.typography.body,
      }}>
        <div style={{
          opacity:p,
          transform:"translateY(" + ((1-p)*24) + "px)",
        }}>
          <Tag color={theme.colors.yellow}>
            DESIGNER {String(index+1).padStart(2,"0")}
          </Tag>

          <div style={{marginTop:24}}>
            <BigTitle>{designer.name}</BigTitle>
          </div>

          <div style={{
            marginTop:16,
            maxWidth:800,
            fontSize:25,
            lineHeight:1.25,
            color:theme.colors.text,
            opacity:.82,
          }}>
            {designer.description}
          </div>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"1.15fr .85fr",
          gap:30,
          marginTop:40,
        }}>
          <Panel style={{minHeight:360}}>
            <div style={{
              fontSize:18,
              fontWeight:900,
              opacity:.55,
              marginBottom:20,
            }}>
              COMPONENTES
            </div>

            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <Tag color={theme.colors.cyan}>CONTEXTO</Tag>
              <Tag color={theme.colors.green}>OBJETIVO</Tag>
              <Tag color={theme.colors.pink}>FORMATO</Tag>
            </div>

            <div style={{
              marginTop:34,
              fontSize:32,
              lineHeight:1.1,
              fontWeight:900,
            }}>
              A mesma aula pode ganhar uma identidade completamente diferente.
            </div>

            <div style={{
              marginTop:30,
              height:24,
              border:theme.border,
              borderRadius:999,
              overflow:"hidden",
              background:theme.colors.panel,
            }}>
              <div style={{
                width:"78%",
                height:"100%",
                background:theme.colors.cyan,
              }}/>
            </div>
          </Panel>

          <Panel style={{minHeight:360}}>
            <div style={{
              fontSize:18,
              fontWeight:900,
              opacity:.55,
              marginBottom:22,
            }}>
              PALETA
            </div>

            <div style={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              gap:14,
            }}>
              {[
                theme.colors.yellow,
                theme.colors.cyan,
                theme.colors.green,
                theme.colors.pink,
                theme.colors.red,
                theme.colors.ink,
              ].map((color,i)=>(
                <div
                  key={i}
                  style={{
                    height:72,
                    border:theme.border,
                    borderRadius:theme.tagRadius,
                    background:color,
                    boxShadow:theme.shadow,
                  }}
                />
              ))}
            </div>

            <div style={{
              marginTop:26,
              fontSize:18,
              fontWeight:800,
              color:theme.colors.ink,
            }}>
              {designer.id}
            </div>
          </Panel>
        </div>
      </AbsoluteFill>
    </DesignerProvider>
  );
};

const designers=listDesigners();

export const designerGalleryDurationInFrames = designers.length * 120;

export const DesignerGallery: React.FC = () => (
  <Series>
    {designers.map((designer,index)=>(
      <Series.Sequence
        key={designer.id}
        durationInFrames={120}
      >
        <Preview designer={designer} index={index}/>
      </Series.Sequence>
    ))}
  </Series>
);
