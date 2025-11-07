"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[446],{7446:function(e,t,n){n.d(t,{A:function(){return F}});var i=n(7294),a=n(8239),r=n(5855),o=n(5582),s=n(1730),l=n(6720),c=n(6066),u=n(2437);const m=(0,i.createContext)([null,e=>{}]);var d=n(2293),g=n(155),h=n(5861),p=n(6886),f=n(1292),y=n(3946),x=n(1233),S=n(9944),A=n(1789),b=n(5893);const w={[c.UB8.Monster]:"???",[c.UB8.Adventurer]:"Brand new heroes gain bonus experience until they find their niche.",[c.UB8.JackOfAllTrades]:"All your stats are the same. Did you forget to level up?",[c.UB8.Gambler]:"Gamblers gain an additional level of crit, random amounts of their luck added to accuracy and dodge, +20% to dexterity wisdom and luck and +10% to all other stats",[c.UB8.Fighter]:"Fighters gain +50% strength, +30% to dexterity, and +20% to willpower",[c.UB8.Berserker]:"Berserkers received +100% strengtth and +30% dexterity",[c.UB8.Wizard]:"You receive +100% intelligence and +30% wisdom",[c.UB8.Warlock]:"You receive +50% intelligence, +30% wisdom, and +20% willpower",[c.UB8.BattleMage]:"Battle Mage's can attack with both a spell and a weapon at the same time, additionally they receive +100% strength, +30% dexterity, +100% intelligence, +30% wisdom, and +20% willpower",[c.UB8.Paladin]:"Paladins can use shields as weapons, additionally they receive +30% willpower",[c.UB8.Ranger]:"Rangers receive double accuracy and +1 weapon level",[c.UB8.BloodMage]:"Blood Mages damage themselves every time they attack but gain +20% Constitution",[c.UB8.Daredevil]:"+10-110% Strength Constitution Intelligence and Willpower, +20-120% Wisdom Dexterity and Luck, 2x accuracy, and +0-3 weapon levels",[c.UB8.Gladiator]:"+200% Strength, +160% Dexterity, +20% Willpower, 2x accuracy, and +1 weapon level",[c.UB8.EnragedBerserker]:"+300% Strength, +160% Dexterity, 2x accuracy, and +1 weapon level",[c.UB8.MasterWizard]:"+300% Intelligence, +160% Wisdom, 2x accuracy, and +1 weapon level",[c.UB8.MasterWarlock]:"+200% Intelligence, +160% Wisdom, +20% Willpower, 2x accuracy, and +1 weapon level",[c.UB8.DemonHunter]:"+500% Strength and Intelligence, +70% Dexterity and Wisdom, +50% Willpower, 2x accuracy, and +1 weapon level",[c.UB8.Zealot]:"+70% Willpower, +100% Wisdom, double accuracy",[c.UB8.Archer]:"+200% Dexterity and +2 weapon levels",[c.UB8.Vampire]:"+80% Constitution, +50% Willpower, Halves enemy base damage, and +1 weapon level"};function v({hero:e}){const t=w[e.class]??"???";return(0,b.jsx)(i.Fragment,{children:(0,b.jsxs)(p.ZP,{container:!0,columns:6,children:[(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-level",children:"Level: "}),(0,b.jsx)("span",{id:"hero-stats-level","data-testid":"character-level",children:e.level.toLocaleString()})]}),(0,b.jsx)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:(0,b.jsx)(f.Z,{title:t,leaveTouchDelay:5e3,children:(0,b.jsxs)("span",{children:[(0,b.jsx)("label",{htmlFor:"hero-stats-class",children:"Class: "}),(0,b.jsx)("span",{id:"hero-stats-class",children:(0,A.qh)(e.class)}),(0,b.jsx)(S.Z,{sx:{fontSize:10,verticalAlign:"top"}})]})})}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-gold",children:"Gold: "}),(0,b.jsx)("span",{id:"hero-stats-gold",children:e.gold.toLocaleString()})]}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-location",children:"Location: "}),(0,b.jsxs)("span",{id:"hero-stats-location",children:[e.location.x,", ",e.location.y]})]}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-experience-container",children:"Experience: "}),(0,b.jsxs)("span",{id:"hero-stats-experience-container","aria-label":`${e.experience} out of ${e.needed}`,children:[(0,b.jsx)("span",{id:"hero-stats-experience",children:e.experience.toLocaleString()})," ","/"," ",(0,b.jsx)("span",{id:"hero-stats-experience-needed",children:e.needed.toLocaleString()})]})]}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-health",children:"Health: "}),(0,b.jsxs)("span",{id:"hero-stats-health",children:[e.combat.health.toLocaleString()," /"," ",e.combat.maxHealth.toLocaleString()]})]}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-strength",children:"Strength: "}),(0,b.jsx)("span",{id:"hero-stats-strength",children:e.stats.strength.toLocaleString()})]}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-dexterity",children:"Dexterity: "}),(0,b.jsx)("span",{id:"hero-stats-dexterity",children:e.stats.dexterity.toLocaleString()})]}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-constitution",children:"Constitution: "}),(0,b.jsx)("span",{id:"hero-stats-constitution",children:e.stats.constitution.toLocaleString()})]}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-intelligence",children:"Intelligence: "}),(0,b.jsx)("span",{id:"hero-stats-intelligence",children:e.stats.intelligence.toLocaleString()})]}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-wisdom",children:"Wisdom: "}),(0,b.jsx)("span",{id:"hero-stats-wisdom",children:e.stats.wisdom.toLocaleString()})]}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-willpower",children:"Willpower: "}),(0,b.jsx)("span",{id:"hero-stats-willpower",children:e.stats.willpower.toLocaleString()})]}),(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-luck",children:"Luck: "}),(0,b.jsx)("span",{id:"hero-stats-luck",children:e.stats.luck.toLocaleString()})]}),e.enchantingDust>200&&(0,b.jsxs)(p.ZP,{item:!0,lg:1,md:2,sm:3,xs:6,children:[(0,b.jsx)("label",{htmlFor:"hero-stats-gold",children:"Dust: "}),(0,b.jsx)("span",{id:"hero-stats-gold",children:e.enchantingDust.toLocaleString()})]})]})})}var k=n(6252),B=n(1163),D=n(9200),P=n(5662),$=n(1767);function I({sx:e}){const t=(0,B.useRouter)(),n=(0,k.x)(),[i,a]=(0,$.d)();return i?(0,b.jsx)(D.Z,{children:(0,b.jsx)(P.Z,{"aria-label":"Logout and return to login screen",color:"error",variant:"contained",disableElevation:!0,onClick:function(){a(null),n.clearStore(),t.push("/")},sx:e,children:"Logout"})}):null}var j=n(9078),W=n(6646);function R({hero:e}){const[t,n]=(0,i.useContext)(m),s=(0,i.useMemo)((()=>(0,a.Z)({palette:{mode:t?"dark":"light",primary:t?{main:"#0d2b4a"}:{main:"#1976d2"}}})),[t]);return(0,b.jsx)(r.Z,{theme:s,children:(0,b.jsxs)(d.Z,{position:"static",color:"primary",enableColorOnDark:!0,children:[(0,b.jsx)(g.Z,{children:(0,b.jsx)(o.Z,{children:(0,b.jsxs)(p.ZP,{container:!0,columns:3,children:[(0,b.jsx)(p.ZP,{item:!0,xs:2,children:(0,b.jsx)(h.Z,{variant:"h4",component:"p",children:"Proof of Combat"})}),(0,b.jsx)(p.ZP,{item:!0,xs:1,children:(0,b.jsxs)(x.Z,{direction:"row",spacing:1,alignItems:"center",justifyContent:"flex-end",children:[e&&(0,b.jsxs)(h.Z,{variant:"body1",component:"p",sx:{mr:1},children:[e.name," ",(0,b.jsx)(I,{})]}),(0,b.jsx)(f.Z,{title:t?"Switch to light mode":"Switch to dark mode",children:(0,b.jsx)(y.Z,{size:"small",color:"inherit","aria-label":t?"toggle light mode":"toggle dark mode",onClick:()=>n(!t),children:t?(0,b.jsx)(W.Z,{}):(0,b.jsx)(j.Z,{})})})]})})]})})}),(0,b.jsx)(o.Z,{children:e&&(0,b.jsx)(v,{hero:e})})]})})}function M({delay:e}){const t=(0,i.useRef)(null);return(0,i.useLayoutEffect)((()=>{if(!t.current)return;if(e<=0)return t.current.style.transition="none",void(t.current.style.width="0%");t.current.style.transition="none",t.current.style.width="100%";const n=setTimeout((()=>{t.current&&(t.current.style.transition=`width ${e}ms linear 100ms`,t.current.style.width="0px")}),1);return()=>clearTimeout(n)}),[e,t.current]),(0,b.jsx)("div",{id:"delay-bar-container",className:e>0?"is-in-delay":"no-delay",style:{width:"100%",height:"6px",backgroundColor:"#ccc"},children:(0,b.jsx)("div",{id:"delay-bar",ref:t,style:{height:"100%",backgroundColor:"#f0f"}})})}var C=n(7720),E=n(375);function L(){return(0,b.jsxs)(i.Fragment,{children:[(0,b.jsx)("br",{}),(0,b.jsx)(C.Z,{}),(0,b.jsx)("br",{}),(0,b.jsx)(o.Z,{children:(0,b.jsxs)(p.ZP,{container:!0,columns:3,children:[(0,b.jsx)(p.ZP,{item:!0,sm:1,xs:3,children:(0,b.jsx)(h.Z,{children:(0,b.jsx)("a",{href:"https://github.com/chrisinajar/proofofcombat",target:"_blank",rel:"noreferrer",children:"Client source code"})})}),(0,b.jsx)(p.ZP,{item:!0,sm:1,xs:3,children:(0,b.jsx)(h.Z,{align:"center",children:(0,b.jsx)("a",{href:"https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fchrisinajar.com%3A8443%2Fgraphql",target:"_blank",rel:"noreferrer",children:"API explorer"})})}),(0,b.jsx)(p.ZP,{item:!0,sm:1,xs:3,children:(0,b.jsx)(h.Z,{align:"right",children:(0,b.jsx)("a",{href:"https://github.com/chrisinajar/proofofcombat-server",target:"_blank",rel:"noreferrer",children:"Server source code"})})})]})}),(0,b.jsx)("br",{}),(0,b.jsx)("br",{}),(0,b.jsx)(h.Z,{variant:"h1",sx:E.Z,children:"Logout"}),(0,b.jsx)(I,{sx:E.Z})]})}var T=n(1458);function H({hero:e}){return(0,b.jsxs)(i.Fragment,{children:[(0,b.jsx)(T.Z,{sx:{height:10},variant:"determinate",value:e.combat.health/e.combat.maxHealth*100,color:"success"}),(0,b.jsx)(T.Z,{sx:{height:10},variant:"determinate",value:e.experience/e.needed*100,color:"secondary"})]})}function F({children:e,showHero:t=!1}){const n=Date.now(),d=(0,s.Z)("(prefers-color-scheme: dark)"),[g,h]=(0,i.useState)(!0),[p,f]=(0,i.useState)(0),[y,x]=(0,i.useState)(0),{data:S,networkStatus:A}=(0,c.UEB)({pollInterval:6e4,skip:!t,returnPartialData:!0});(0,i.useEffect)((()=>{if(S?.me?.now){const e=Number(S.me.now);console.log("Update time drift:",n-e),f(n-e)}}),[S?.me?.now]),(0,i.useEffect)((()=>{if(S?.me?.account?.timeRemaining&&S?.me?.account?.nextAllowedAction&&S?.me?.account?.timeRemaining>0){const e=Number(S.me.account.nextAllowedAction)+p-n;e>S.me.account.timeRemaining&&(console.log("Shortening time difference by",e-S.me.account.timeRemaining),f(p-(e-S.me.account.timeRemaining)))}}),[S?.me?.account?.timeRemaining,p]);const[w,v]=(0,u.gZ)(),[k,B]=(0,i.useState)(0),D=Number(S?.me?.account?.nextAllowedAction??0)+p,P=null===g?d:g,$=(0,i.useMemo)((()=>(0,a.Z)({palette:{mode:P?"dark":"light",primary:{main:"#1976d2"},secondary:{main:"#9c27b0"},info:{main:"#339cef"},error:P?{main:"#f44336",dark:"#621c13"}:{main:"#df1a0c"},background:P?{default:"#141414",paper:"#383838"}:{default:"#ededed",paper:"#ddd"}},shape:{borderRadius:2}})),[P]);if((0,i.useEffect)((()=>{if(w>0){const e=setTimeout((()=>{const e=D-Date.now();v(e)}),Math.max(50,w));return()=>clearTimeout(e)}}),[w]),(0,i.useEffect)((()=>{if(!S?.me?.account?.nextAllowedAction)return;const e=D-n;e>0&&(e>w&&B(e),v(e))}),[S?.me?.account?.nextAllowedAction,p]),S&&t){const{me:{now:t,account:{hero:n,nextAllowedAction:i}}}=S;if(n)return(0,b.jsxs)(r.Z,{theme:$,children:[(0,b.jsx)(l.ZP,{enableColorScheme:!0}),(0,b.jsxs)(m.Provider,{value:[P,h],children:[(0,b.jsx)(R,{hero:n}),(0,b.jsx)(H,{hero:n}),(0,b.jsx)(M,{delay:w}),(0,b.jsx)(o.Z,{children:e}),(0,b.jsx)(L,{})]})]})}return(0,b.jsxs)(r.Z,{theme:$,children:[(0,b.jsx)(l.ZP,{enableColorScheme:!0}),(0,b.jsxs)(m.Provider,{value:[P,h],children:[(0,b.jsx)(R,{}),(0,b.jsx)(o.Z,{children:e}),(0,b.jsx)(L,{})]})]})}},6066:function(e,t,n){n.d(t,{$7w:function(){return y},AFf:function(){return w},BlB:function(){return xe},CbY:function(){return Jt},Dpx:function(){return ft},E0W:function(){return ae},EDV:function(){return D},F2d:function(){return K},Fwk:function(){return ne},GCP:function(){return u},G_X:function(){return dt},HkW:function(){return Oe},Htf:function(){return oe},IDk:function(){return Q},JaR:function(){return rn},Ksz:function(){return s},Kt_:function(){return S},L7b:function(){return ut},MAF:function(){return Ot},N$O:function(){return O},NAy:function(){return et},Nn4:function(){return we},Nwq:function(){return Zt},OQs:function(){return k},OfX:function(){return he},PF1:function(){return Le},PwK:function(){return $e},Q8L:function(){return Lt},QTh:function(){return qt},Qse:function(){return L},Rw_:function(){return De},SDN:function(){return kt},TXn:function(){return J},Ths:function(){return Ht},UB8:function(){return h},UEB:function(){return sn},URC:function(){return H},Upb:function(){return Ct},W1t:function(){return ot},WBn:function(){return l},WKu:function(){return m},Wg9:function(){return qe},XeQ:function(){return Ce},Xxd:function(){return Qt},Y46:function(){return Ze},YAP:function(){return fe},_Wg:function(){return q},_vS:function(){return ee},aPk:function(){return He},bt:function(){return en},bv4:function(){return Rt},cKO:function(){return jt},dEQ:function(){return Je},dgo:function(){return je},gKg:function(){return lt},gTu:function(){return A},gtK:function(){return j},hE$:function(){return Qe},hKI:function(){return nn},hKe:function(){return c},hLf:function(){return de},hv7:function(){return Kt},iAZ:function(){return At},iU:function(){return G},iX9:function(){return C},j9V:function(){return $t},jDZ:function(){return Ae},jEK:function(){return Ge},jH$:function(){return g},kOX:function(){return ht},kjr:function(){return d},kzV:function(){return R},lGO:function(){return Z},lqA:function(){return p},m8V:function(){return Ke},mEo:function(){return Re},nyX:function(){return wt},o_Z:function(){return Gt},p$b:function(){return x},pLI:function(){return le},q75:function(){return nt},sfN:function(){return $},tyB:function(){return xt},w3L:function(){return ke},xsR:function(){return Dt},zC:function(){return ue},zNH:function(){return at},zPP:function(){return f}});var i=n(8806),a=n(319),r=n(7887);const o={};let s=function(e){return e.Admin="Admin",e}({}),l=function(e){return e.AllResistances="AllResistances",e.BlightResistance="BlightResistance",e.BonusBlightDamage="BonusBlightDamage",e.BonusConstitution="BonusConstitution",e.BonusDexterity="BonusDexterity",e.BonusExperience="BonusExperience",e.BonusFireDamage="BonusFireDamage",e.BonusHealth="BonusHealth",e.BonusHolyDamage="BonusHolyDamage",e.BonusIceDamage="BonusIceDamage",e.BonusIntelligence="BonusIntelligence",e.BonusLightningDamage="BonusLightningDamage",e.BonusLuck="BonusLuck",e.BonusMagicalDamage="BonusMagicalDamage",e.BonusPhysicalDamage="BonusPhysicalDamage",e.BonusSkillChance="BonusSkillChance",e.BonusStrength="BonusStrength",e.BonusWillpower="BonusWillpower",e.BonusWisdom="BonusWisdom",e.DamageAsBlight="DamageAsBlight",e.DamageAsFire="DamageAsFire",e.DamageAsHoly="DamageAsHoly",e.DamageAsIce="DamageAsIce",e.DamageAsLightning="DamageAsLightning",e.DamageAsMagical="DamageAsMagical",e.DamageAsPhysical="DamageAsPhysical",e.DamageReduction="DamageReduction",e.EnemyBlightResistance="EnemyBlightResistance",e.EnemyFireResistance="EnemyFireResistance",e.EnemyHolyResistance="EnemyHolyResistance",e.EnemyIceResistance="EnemyIceResistance",e.EnemyLightningResistance="EnemyLightningResistance",e.EnemyMagicalResistance="EnemyMagicalResistance",e.EnemyPhysicalResistance="EnemyPhysicalResistance",e.EnhancedDamage="EnhancedDamage",e.FireResistance="FireResistance",e.Focus="Focus",e.HolyResistance="HolyResistance",e.IceResistance="IceResistance",e.ItemBonusArmor="ItemBonusArmor",e.ItemBonusDamage="ItemBonusDamage",e.ItemFlatArmor="ItemFlatArmor",e.ItemFlatDamage="ItemFlatDamage",e.Lifesteal="Lifesteal",e.LightningResistance="LightningResistance",e.MagicalResistance="MagicalResistance",e.Mesmerize="Mesmerize",e.PhysicalResistance="PhysicalResistance",e.ReducedDelay="ReducedDelay",e}({}),c=function(e){return e.Blood="BLOOD",e.Cast="CAST",e.Melee="MELEE",e.Ranged="RANGED",e.Smite="SMITE",e}({}),u=function(e){return e.All="all",e.Constitution="constitution",e.Dexterity="dexterity",e.Intelligence="intelligence",e.Luck="luck",e.Strength="strength",e.Willpower="willpower",e.Wisdom="wisdom",e}({}),m=function(e){return e.AnyOrder="AnyOrder",e.LockedOrder="LockedOrder",e}({}),d=function(e){return e.AllStatsSteal="AllStatsSteal",e.AncientKey="AncientKey",e.ArcherUpgrade="ArcherUpgrade",e.AutoBattle="AutoBattle",e.BattleMageUpgrade="BattleMageUpgrade",e.BigCaster="BigCaster",e.BigCounterSpell="BigCounterSpell",e.BigMelee="BigMelee",e.BonusAllStats="BonusAllStats",e.BonusArmor="BonusArmor",e.BonusArmorTier="BonusArmorTier",e.BonusCasterWeaponTier="BonusCasterWeaponTier",e.BonusConstitution="BonusConstitution",e.BonusDexterity="BonusDexterity",e.BonusDust="BonusDust",e.BonusIntelligence="BonusIntelligence",e.BonusLuck="BonusLuck",e.BonusMeleeWeaponTier="BonusMeleeWeaponTier",e.BonusMental="BonusMental",e.BonusPhysical="BonusPhysical",e.BonusRangedWeaponTier="BonusRangedWeaponTier",e.BonusSmiteWeaponTier="BonusSmiteWeaponTier",e.BonusStrength="BonusStrength",e.BonusWeaponTier="BonusWeaponTier",e.BonusWillpower="BonusWillpower",e.BonusWisdom="BonusWisdom",e.CanCraft="CanCraft",e.CanOnlyTakeOneDamage="CanOnlyTakeOneDamage",e.CanRebirth="CanRebirth",e.CanTravelOnForbidden="CanTravelOnForbidden",e.CanTravelOnWater="CanTravelOnWater",e.CasterArmorPiercing="CasterArmorPiercing",e.CasterUpgrade="CasterUpgrade",e.ConstitutionSteal="ConstitutionSteal",e.CounterSpell="CounterSpell",e.DexteritySteal="DexteritySteal",e.DiamondBlessing="DiamondBlessing",e.DoubleAccuracy="DoubleAccuracy",e.DoubleAllStats="DoubleAllStats",e.DoubleDodge="DoubleDodge",e.DoubleExperience="DoubleExperience",e.DoubleLeveling="DoubleLeveling",e.EmeraldBlessing="EmeraldBlessing",e.FishermansConstitution="FishermansConstitution",e.FishermansDexterity="FishermansDexterity",e.FishermansIntelligence="FishermansIntelligence",e.FishermansLuck="FishermansLuck",e.FishermansStrength="FishermansStrength",e.FishermansWillpower="FishermansWillpower",e.FishermansWisdom="FishermansWisdom",e.Focus="Focus",e.GamblerUpgrade="GamblerUpgrade",e.ImprovedAutomation="ImprovedAutomation",e.IncreasedGoldCap="IncreasedGoldCap",e.IntelligenceSteal="IntelligenceSteal",e.LifeDamage="LifeDamage",e.LifeHeal="LifeHeal",e.LifeSteal="LifeSteal",e.LuckSteal="LuckSteal",e.MeleeArmorPiercing="MeleeArmorPiercing",e.MeleeUpgrade="MeleeUpgrade",e.Mesmerize="Mesmerize",e.MinusEnemyAllStats="MinusEnemyAllStats",e.MinusEnemyArmor="MinusEnemyArmor",e.MinusEnemyConstitution="MinusEnemyConstitution",e.MinusEnemyDexterity="MinusEnemyDexterity",e.MinusEnemyIntelligence="MinusEnemyIntelligence",e.MinusEnemyMental="MinusEnemyMental",e.MinusEnemyPhysical="MinusEnemyPhysical",e.MinusEnemyStrength="MinusEnemyStrength",e.MinusEnemyWillpower="MinusEnemyWillpower",e.MinusEnemyWisdom="MinusEnemyWisdom",e.RangedArmorPiercing="RangedArmorPiercing",e.RangedSecondAttackChance="RangedSecondAttackChance",e.ReduceTeleportCost="ReduceTeleportCost",e.RubyBlessing="RubyBlessing",e.SapphireBlessing="SapphireBlessing",e.SmiteArmorPiercing="SmiteArmorPiercing",e.SmiterUpgrade="SmiterUpgrade",e.StrengthSteal="StrengthSteal",e.SuperAllStats="SuperAllStats",e.SuperBattleMage="SuperBattleMage",e.SuperBattleMageStats="SuperBattleMageStats",e.SuperCaster="SuperCaster",e.SuperCasterStats="SuperCasterStats",e.SuperCounterSpell="SuperCounterSpell",e.SuperDexterity="SuperDexterity",e.SuperDexterityStats="SuperDexterityStats",e.SuperMelee="SuperMelee",e.SuperMeleeStats="SuperMeleeStats",e.SuperMeleeVamp="SuperMeleeVamp",e.SuperMeleeVampStats="SuperMeleeVampStats",e.SuperSorcVamp="SuperSorcVamp",e.SuperSorcVampStats="SuperSorcVampStats",e.SuperVamp="SuperVamp",e.SuperVampMelee="SuperVampMelee",e.SuperVampMeleeStats="SuperVampMeleeStats",e.SuperVampSorc="SuperVampSorc",e.SuperVampSorcStats="SuperVampSorcStats",e.SuperVampStats="SuperVampStats",e.SuperWillpower="SuperWillpower",e.SuperWillpowerStats="SuperWillpowerStats",e.SuperWisdom="SuperWisdom",e.SuperWisdomStats="SuperWisdomStats",e.ThirtyLifeSteal="ThirtyLifeSteal",e.TierFourCommon="TierFourCommon",e.TwentyLifeSteal="TwentyLifeSteal",e.UpgradedSettlement="UpgradedSettlement",e.VampireArmorPiercing="VampireArmorPiercing",e.VampireUpgrade="VampireUpgrade",e.Vampirism="Vampirism",e.VoidTravel="VoidTravel",e.WillpowerSteal="WillpowerSteal",e.WisDexWill="WisDexWill",e.WisdomSteal="WisdomSteal",e}({}),g=function(e){return e.Scabsteel="Scabsteel",e.ShameForged="ShameForged",e}({}),h=function(e){return e.Adventurer="Adventurer",e.Archer="Archer",e.BattleMage="BattleMage",e.Berserker="Berserker",e.BloodMage="BloodMage",e.Daredevil="Daredevil",e.DemonHunter="DemonHunter",e.EnragedBerserker="EnragedBerserker",e.Fighter="Fighter",e.Gambler="Gambler",e.Gladiator="Gladiator",e.JackOfAllTrades="JackOfAllTrades",e.MasterWarlock="MasterWarlock",e.MasterWizard="MasterWizard",e.Monk="Monk",e.Monster="Monster",e.Paladin="Paladin",e.Ranger="Ranger",e.Vampire="Vampire",e.Warlock="Warlock",e.Wizard="Wizard",e.Zealot="Zealot",e}({}),p=function(e){return e.AttackingAccuracy="attackingAccuracy",e.AttackingDamage="attackingDamage",e.CastingAccuracy="castingAccuracy",e.CastingDamage="castingDamage",e.Regeneration="regeneration",e.Resilience="resilience",e.Vitality="vitality",e}({}),f=function(e){return e.Blight="Blight",e.Fire="Fire",e.Ice="Ice",e.Lightning="Lightning",e.Normal="Normal",e.Reckless="Reckless",e.Sunder="Sunder",e}({}),y=function(e){return e.Accessory="Accessory",e.BodyArmor="BodyArmor",e.FootArmor="FootArmor",e.HandArmor="HandArmor",e.HeadArmor="HeadArmor",e.LegArmor="LegArmor",e.MeleeWeapon="MeleeWeapon",e.Quest="Quest",e.RangedWeapon="RangedWeapon",e.Shield="Shield",e.SpellFocus="SpellFocus",e}({}),x=function(e){return e.East="EAST",e.North="NORTH",e.South="SOUTH",e.West="WEST",e}({}),S=function(e){return e.Apiary="Apiary",e.Barracks="Barracks",e.Camp="Camp",e.Farm="Farm",e.Garrison="Garrison",e.Settlement="Settlement",e.Shrine="Shrine",e.Treasury="Treasury",e}({}),A=function(e){return e.ChoppingBlock="ChoppingBlock",e.FirePit="FirePit",e.Garden="Garden",e.GovernorsManor="GovernorsManor",e.HasBuiltFarm="HasBuiltFarm",e.HasGovernorsTitle="HasGovernorsTitle",e.HiredHelp="HiredHelp",e.ImprovedCamp="ImprovedCamp",e.RainCollectionUnit="RainCollectionUnit",e.Settlement="Settlement",e.StoneStorage="StoneStorage",e.StorageCache="StorageCache",e.Tent="Tent",e.TradingPost="TradingPost",e.WoodStorage="WoodStorage",e}({});const b=i.Ps`
    mutation AcceptTrade($offer: ID!) {
  acceptTrade(offer: $offer) {
    hero {
      id
      gold
      inventory {
        id
        baseItem
        owner
        name
        type
        level
        enchantment
      }
      outgoingTrades {
        id
        gold
        item {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        toName
        toId
        fromName
        fromId
      }
      incomingTrades {
        id
        gold
        item {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        toName
        toId
        fromName
        fromId
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function w(e){const t={...o,...e};return a.D(b,t)}const v=i.Ps`
    mutation AddLevels($id: ID!, $levels: Int!) {
  addLevels(id: $id, levels: $levels) {
    id
    hero {
      id
      level
      levelCap
      experience
      needed
      attributePoints
      combat {
        health
        maxHealth
      }
      stats {
        dexterity
        intelligence
        willpower
        constitution
        wisdom
        luck
        strength
      }
    }
  }
}
    `;function k(e){const t={...o,...e};return a.D(v,t)}const B=i.Ps`
    query AdminAccount($id: ID!) {
  account(id: $id) {
    id
    name
    banned
    nextAllowedAction
    timeRemaining
    access
    hero {
      version
      id
      name
      class
      level
      levelCap
      experience
      needed
      gold
      enchantingDust
      attributePoints
      enchantments
      skillPercent
      activeSkill
      buffs {
        blessing
      }
      skills {
        attackingAccuracy
        castingAccuracy
        attackingDamage
        castingDamage
        vitality
        resilience
        regeneration
      }
      location {
        x
        y
        map
      }
      questLog {
        washedUp {
          id
          progress
          finished
          started
          lastEvent {
            quest
            message
            id
          }
        }
        rebirth {
          id
          progress
          finished
          started
          lastEvent {
            quest
            message
            id
          }
        }
        droop {
          id
          progress
          finished
          started
          lastEvent {
            quest
            message
            id
          }
        }
        clockwork {
          id
          progress
          finished
          started
          lastEvent {
            quest
            message
            id
          }
        }
        nagaScale {
          id
          progress
          finished
          started
          lastEvent {
            quest
            message
            id
          }
        }
        tasteForBusiness {
          id
          progress
          finished
          started
          lastEvent {
            quest
            message
            id
          }
          eventHistory {
            id
            quest
            message
          }
        }
        id
      }
      currentQuest {
        quest
        message
        id
      }
      inventory {
        id
        baseItem
        owner
        name
        type
        level
        enchantment
      }
      equipment {
        id
        accessories {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        footArmor {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        headArmor {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        legArmor {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        handArmor {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        bodyArmor {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        rightHand {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        leftHand {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        artifact {
          id
          owner
          name
          level
          attributes {
            namePrefix {
              type
              magnitude
            }
            namePostfix {
              type
              magnitude
            }
            titlePrefix {
              type
              magnitude
            }
            titlePostfix {
              type
              magnitude
            }
            bonusAffixes {
              type
              magnitude
            }
          }
        }
      }
      combat {
        health
        maxHealth
      }
      stats {
        dexterity
        intelligence
        willpower
        constitution
        wisdom
        luck
        strength
      }
      combatStats {
        damageAmplification
        armor
        armorReduction
        enemyStats {
          luck
          willpower
          wisdom
          intelligence
          constitution
          strength
          dexterity
        }
        stats {
          willpower
          constitution
          dexterity
          intelligence
          luck
          strength
          wisdom
        }
        physicalResistance
        magicalResistance
        fireResistance
        iceResistance
        lightningResistance
        holyResistance
        blightResistance
        attackRating
        physicalEvasionRating
        magicEvasionRating
        baseDamage
        secondAttackBaseDamage
      }
      outgoingTrades {
        gold
        item {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        toName
        toId
        fromName
        fromId
        id
      }
      incomingTrades {
        gold
        item {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        toName
        toId
        fromName
        fromId
        id
      }
      settings {
        minimumStats {
          strength
          dexterity
          intelligence
          constitution
          wisdom
          willpower
          luck
        }
        autoDust
      }
      activeStance
      availableStances
    }
  }
}
    `;function D(e){const t={...o,...e};return r.a(B,t)}const P=i.Ps`
    query AdminAccounts {
  accounts {
    count
    accounts {
      id
      name
      hero {
        id
        name
        class
        location {
          x
          y
          map
        }
      }
    }
  }
}
    `;function $(e){const t={...o,...e};return r.a(P,t)}const I=i.Ps`
    mutation BanAccount($id: ID!) {
  banAccount(id: $id) {
    success
    account {
      id
      banned
    }
  }
}
    `;function j(e){const t={...o,...e};return a.D(I,t)}const W=i.Ps`
    mutation ClearDungeon($id: ID!) {
  clearDungeon(id: $id) {
    id
    name
  }
}
    `;function R(e){const t={...o,...e};return a.D(W,t)}const M=i.Ps`
    mutation CreateItem($id: ID!, $baseItem: String!, $enchantment: EnchantmentType) {
  createItem(id: $id, baseItem: $baseItem, enchantment: $enchantment) {
    id
  }
}
    `;function C(e){const t={...o,...e};return a.D(M,t)}const E=i.Ps`
    mutation DeleteAccount($id: ID!) {
  deleteAccount(id: $id) {
    success
  }
}
    `;function L(e){const t={...o,...e};return a.D(E,t)}const T=i.Ps`
    mutation GenerateArtifact($id: ID!, $level: Float!) {
  generateArtifact(id: $id, level: $level) {
    id
    hero {
      id
      pendingArtifact {
        id
        owner
        name
        level
        attributes {
          namePrefix {
            type
            magnitude
          }
          namePostfix {
            type
            magnitude
          }
          titlePrefix {
            type
            magnitude
          }
          titlePostfix {
            type
            magnitude
          }
          bonusAffixes {
            type
            magnitude
          }
        }
      }
    }
  }
}
    `;function H(e){const t={...o,...e};return a.D(T,t)}const F=i.Ps`
    mutation GiveGold($id: ID!, $amount: Float!) {
  giveGold(id: $id, amount: $amount) {
    id
    hero {
      id
      gold
    }
  }
}
    `;function q(e){const t={...o,...e};return a.D(F,t)}const U=i.Ps`
    mutation SetSkill($id: ID!, $skill: HeroSkill!, $level: Int!) {
  setSkill(id: $id, skill: $skill, level: $level) {
    id
    hero {
      id
      skills {
        attackingAccuracy
        castingAccuracy
        attackingDamage
        castingDamage
        vitality
        resilience
        regeneration
      }
    }
  }
}
    `;function Z(e){const t={...o,...e};return a.D(U,t)}const V=i.Ps`
    mutation SpawnRandomBoss {
  spawnRandomBoss {
    success
  }
}
    `;function O(e){const t={...o,...e};return a.D(V,t)}const N=i.Ps`
    mutation StartDungeon($id: ID!, $sequence: [ID!]!, $selection: DungeonSelectionMode, $dungeonId: ID, $lockAtStart: Boolean) {
  startDungeon(
    id: $id
    sequence: $sequence
    selection: $selection
    dungeonId: $dungeonId
    lockAtStart: $lockAtStart
  ) {
    id
    name
  }
}
    `;function G(e){const t={...o,...e};return a.D(N,t)}const z=i.Ps`
    mutation UnbanAccount($id: ID!) {
  unbanAccount(id: $id) {
    success
    account {
      id
      banned
    }
  }
}
    `;function Q(e){const t={...o,...e};return a.D(z,t)}const _=i.Ps`
    mutation DismissTrade($offer: ID!) {
  dismissTrade(offer: $offer) {
    hero {
      id
      outgoingTrades {
        id
        gold
        item {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        toName
        toId
        fromName
        fromId
      }
      incomingTrades {
        id
        gold
        item {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
        toName
        toId
        fromName
        fromId
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function K(e){const t={...o,...e};return a.D(_,t)}const X=i.Ps`
    query GetChatToken {
  chat {
    token
  }
}
    `;function J(e){const t={...o,...e};return r.a(X,t)}const Y=i.Ps`
    query GetTrades {
  me {
    account {
      id
      nextAllowedAction
      timeRemaining
      hero {
        id
        gold
        outgoingTrades {
          gold
          item {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
          }
          toName
          toId
          fromName
          fromId
          id
        }
        incomingTrades {
          gold
          item {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
          }
          toName
          toId
          fromName
          fromId
          id
        }
      }
    }
  }
}
    `;function ee(e){const t={...o,...e};return r.a(Y,t)}const te=i.Ps`
    mutation OfferTrade($offer: TradeOfferInput!) {
  offerTrade(offer: $offer) {
    trade {
      id
      gold
      item {
        id
        baseItem
        owner
        name
        type
        level
        enchantment
      }
      toName
      toId
      fromName
      fromId
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function ne(e){const t={...o,...e};return a.D(te,t)}const ie=i.Ps`
    mutation AttackHero($id: ID!, $attackType: AttackType, $stance: HeroStance) {
  attackHero(id: $id, attackType: $attackType, stance: $stance) {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    otherHero {
      id
      name
      level
      class
      local
      combat {
        health
        maxHealth
      }
    }
    log {
      time
      damage
      attackType
      isEnchantment
      success
      from
      isMesmerize
      critical
      to
    }
    victory
    hero {
      id
      gold
      combat {
        health
        maxHealth
      }
    }
  }
}
    `;function ae(e){const t={...o,...e};return a.D(ie,t)}const re=i.Ps`
    mutation Challenge($monster: ID!) {
  challenge(monster: $monster) {
    id
    monster {
      id
      name
      level
      combat {
        health
        maxHealth
      }
    }
  }
}
    `;function oe(e){const t={...o,...e};return a.D(re,t)}const se=i.Ps`
    query Challenges {
  challenges {
    id
    name
    level
  }
}
    `;function le(e){const t={...o,...e};return r.a(se,t)}const ce=i.Ps`
    mutation Fight($monster: ID!, $attackType: AttackType, $stance: HeroStance) {
  fight(monster: $monster, attackType: $attackType, stance: $stance) {
    victory
    experience
    gold
    didLevel
    drop {
      id
      baseItem
      owner
      name
      type
      level
      enchantment
    }
    log {
      time
      damage
      attackType
      damageType
      success
      isEnchantment
      from
      to
      critical
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      level
      experience
      attributePoints
      gold
      needed
      dungeon {
        id
        remaining
        selection
        index
      }
      skills {
        attackingAccuracy
        castingAccuracy
        attackingDamage
        castingDamage
        vitality
        resilience
        regeneration
      }
      location {
        map
        x
        y
      }
      combat {
        health
        maxHealth
      }
      stats {
        luck
        willpower
        wisdom
        intelligence
        constitution
        dexterity
        strength
      }
      inventory {
        id
        baseItem
        owner
        name
        type
        level
        enchantment
      }
      activeStance
      availableStances
    }
    monster {
      id
      monster {
        id
        name
        combat {
          health
          maxHealth
        }
      }
    }
  }
}
    `;function ue(e){const t={...o,...e};return a.D(ce,t)}const me=i.Ps`
    mutation Heal {
  heal {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      combat {
        maxHealth
        health
      }
    }
  }
}
    `;function de(e){const t={...o,...e};return a.D(me,t)}const ge=i.Ps`
    query Monsters {
  monsters {
    id
    monster {
      id
      name
      level
      attackType
      combat {
        health
        maxHealth
      }
    }
  }
}
    `;function he(e){const t={...o,...e};return r.a(ge,t)}const pe=i.Ps`
    mutation Login($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    token
    account {
      name
      hero {
        name
        level
        experience
        combat {
          health
          maxHealth
        }
        stats {
          strength
          dexterity
          constitution
          intelligence
          wisdom
          willpower
          luck
        }
      }
    }
  }
}
    `;function fe(e){const t={...o,...e};return a.D(pe,t)}const ye=i.Ps`
    mutation Signup($name: String!, $password: String!) {
  createAccount(name: $name, password: $password) {
    name
    hero {
      name
    }
  }
}
    `;function xe(e){const t={...o,...e};return a.D(ye,t)}const Se=i.Ps`
    mutation AcceptArtifact {
  acceptArtifact {
    hero {
      id
      equipment {
        id
        artifact {
          id
          owner
          name
          level
          attributes {
            namePrefix {
              type
              magnitude
            }
            namePostfix {
              type
              magnitude
            }
            titlePrefix {
              type
              magnitude
            }
            titlePostfix {
              type
              magnitude
            }
            bonusAffixes {
              type
              magnitude
            }
          }
        }
      }
      pendingArtifact {
        id
        owner
        name
        level
        attributes {
          namePrefix {
            type
            magnitude
          }
          namePostfix {
            type
            magnitude
          }
          titlePrefix {
            type
            magnitude
          }
          titlePostfix {
            type
            magnitude
          }
          bonusAffixes {
            type
            magnitude
          }
        }
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function Ae(e){const t={...o,...e};return a.D(Se,t)}const be=i.Ps`
    mutation BuyItem($baseItem: ID!) {
  buy(baseItem: $baseItem) {
    hero {
      id
      gold
      inventory {
        id
        baseItem
        owner
        name
        type
        level
        enchantment
      }
      equipment {
        id
        accessories {
          id
        }
        footArmor {
          id
        }
        headArmor {
          id
        }
        legArmor {
          id
        }
        handArmor {
          id
        }
        bodyArmor {
          id
        }
        rightHand {
          id
        }
        leftHand {
          id
        }
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function we(e){const t={...o,...e};return a.D(be,t)}const ve=i.Ps`
    mutation ChangeAutoDust($value: Int!) {
  changeAutoDust(value: $value) {
    hero {
      id
      settings {
        autoDust
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function ke(e){const t={...o,...e};return a.D(ve,t)}const Be=i.Ps`
    mutation ChangeMinimumStat($name: String!, $value: Int!) {
  changeMinimumStat(name: $name, value: $value) {
    hero {
      id
      settings {
        minimumStats {
          strength
          dexterity
          intelligence
          constitution
          wisdom
          willpower
          luck
        }
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function De(e){const t={...o,...e};return a.D(Be,t)}const Pe=i.Ps`
    mutation DestroyItem($item: ID!) {
  destroyItem(item: $item) {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      enchantingDust
      inventory {
        id
        baseItem
        owner
        name
        type
        level
        enchantment
      }
    }
  }
}
    `;function $e(e){const t={...o,...e};return a.D(Pe,t)}const Ie=i.Ps`
    mutation DisenchantItem($item: ID!) {
  disenchantItem(item: $item) {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      enchantingDust
      enchantments
      inventory {
        id
        enchantment
      }
    }
  }
}
    `;function je(e){const t={...o,...e};return a.D(Ie,t)}const We=i.Ps`
    mutation EnchantItem($item: ID!, $enchantment: EnchantmentType!) {
  enchantItem(item: $item, enchantment: $enchantment) {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      enchantingDust
      enchantments
      inventory {
        id
        enchantment
      }
    }
  }
}
    `;function Re(e){const t={...o,...e};return a.D(We,t)}const Me=i.Ps`
    mutation ImbueItem($item: String!, $artifact: String!, $affixes: [ArtifactAttributeType!]!) {
  imbueItem(item: $item, artifact: $artifact, affixes: $affixes) {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      enchantingDust
      inventory {
        id
        imbue {
          artifact {
            id
            owner
            name
            level
            attributes {
              namePrefix {
                type
                magnitude
              }
              namePostfix {
                type
                magnitude
              }
              titlePrefix {
                type
                magnitude
              }
              titlePostfix {
                type
                magnitude
              }
              bonusAffixes {
                type
                magnitude
              }
            }
          }
          affixes
        }
      }
    }
  }
}
    `;function Ce(e){const t={...o,...e};return a.D(Me,t)}const Ee=i.Ps`
    mutation DismissQuest {
  dismissQuest {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      inventory {
        id
        baseItem
        owner
        name
        type
        level
        enchantment
      }
      currentQuest {
        id
        message
      }
    }
  }
}
    `;function Le(e){const t={...o,...e};return a.D(Ee,t)}const Te=i.Ps`
    mutation EquipItem($item: ID!, $slot: String!) {
  equip(item: $item, slot: $slot) {
    account {
      nextAllowedAction
      timeRemaining
      id
    }
    hero {
      id
      availableAttacks
      equipment {
        id
        footArmor {
          id
        }
        headArmor {
          id
        }
        legArmor {
          id
        }
        handArmor {
          id
        }
        bodyArmor {
          id
        }
        rightHand {
          id
        }
        leftHand {
          id
        }
      }
    }
  }
}
    `;function He(e){const t={...o,...e};return a.D(Te,t)}const Fe=i.Ps`
    query Leaderboard {
  leaderboard {
    id
    name
    gold
    level
    class
  }
}
    `;function qe(e){const t={...o,...e};return r.a(Fe,t)}const Ue=i.Ps`
    mutation LevelUp($attribute: AttributeType!, $amount: Int) {
  increaseAttribute(attribute: $attribute, amount: $amount) {
    hero {
      id
      attributePoints
      stats {
        luck
        willpower
        wisdom
        intelligence
        constitution
        dexterity
        strength
      }
      combat {
        maxHealth
        health
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function Ze(e){const t={...o,...e};return a.D(Ue,t)}const Ve=i.Ps`
    query AvailableUpgrades {
  availableUpgrades {
    cost {
      name
      value
    }
    name
    type
  }
}
    `;function Oe(e){const t={...o,...e};return r.a(Ve,t)}const Ne=i.Ps`
    mutation BuyResource($resource: String!, $amount: Int!) {
  buyResource(resource: $resource, amount: $amount) {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      gold
      home {
        id
        resources {
          name
          value
          maximum
        }
      }
    }
  }
}
    `;function Ge(e){const t={...o,...e};return a.D(Ne,t)}const ze=i.Ps`
    mutation challengeGraal {
  challengeGraal {
    outcome
    hint
    titleUnlocked
    auraUnlocked
    trophyAwarded
    log {
      time
      damage
      attackType
      isEnchantment
      success
      from
      to
      critical
    }
    ledger {
      total
      wins
      losses
      bestStreak
      currentStreak
      lastChallengedAt
      lastResult
    }
  }
}
    `;function Qe(e){const t={...o,...e};return a.D(ze,t)}const _e=i.Ps`
    mutation chooseGraalLossBenefit($benefit: GraalLossBenefit!) {
  chooseGraalLossBenefit(benefit: $benefit) {
    total
    wins
    losses
    bestStreak
    currentStreak
    lastChallengedAt
    lastResult
  }
}
    `;function Ke(e){const t={...o,...e};return a.D(_e,t)}const Xe=i.Ps`
    query DockList {
  docks {
    name
    type
    location {
      x
      y
    }
  }
}
    `;function Je(e){const t={...o,...e};return r.a(Xe,t)}const Ye=i.Ps`
    mutation ExecuteNpcTrade($trade: ID!) {
  npcTrade(trade: $trade) {
    success
    message
    hero {
      id
      gold
      enchantingDust
      enchantments
      inventory {
        enchantment
        level
        type
        name
        baseItem
        owner
        id
      }
      currentQuest {
        quest
        message
        id
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function et(e){const t={...o,...e};return a.D(Ye,t)}const tt=i.Ps`
    query graalAvailable {
  graalAvailable
}
    `;function nt(e){const t={...o,...e};return r.a(tt,t)}const it=i.Ps`
    query graalLedger {
  graalLedger {
    total
    wins
    losses
    bestStreak
    currentStreak
    lastChallengedAt
    lastResult
  }
}
    `;function at(e){const t={...o,...e};return r.a(it,t)}const rt=i.Ps`
    query LocationDetails($location: LocationInput!) {
  locationDetails(location: $location) {
    voidTravel
    playerLocations {
      id
      location {
        x
        y
        map
      }
      upgrades
      resources {
        name
        value
        maximum
      }
      owner
      publicOwner {
        id
        name
        level
        class
        local
        combat {
          health
          maxHealth
        }
      }
      type
      connections {
        id
        location {
          x
          y
          map
        }
        upgrades
        resources {
          name
          value
          maximum
        }
        owner
        publicOwner {
          id
          name
          level
          class
          local
          combat {
            health
            maxHealth
          }
        }
        type
      }
    }
    specialLocations {
      description
      type
      name
      location {
        x
        y
        map
      }
    }
    location {
      x
      y
      map
    }
    terrain {
      terrain
    }
    shop {
      name
      trades {
        id
        price {
          gold
          dust
          baseItems
          enchantments
          questItems
          description
        }
        offer {
          gold
          dust
          baseItems
          enchantments
          questItems
          description
        }
      }
    }
    players {
      id
      name
      level
      class
      local
      combat {
        health
        maxHealth
      }
    }
    neighborTerrain {
      north {
        terrain
      }
      south {
        terrain
      }
      east {
        terrain
      }
      west {
        terrain
      }
    }
  }
}
    `;function ot(e){const t={...o,...e};return r.a(rt,t)}const st=i.Ps`
    mutation MoveLocation($direction: MoveDirection!) {
  move(direction: $direction) {
    hero {
      id
      location {
        y
        x
      }
      inventory {
        id
        baseItem
        owner
        name
        type
        level
        enchantment
      }
      currentQuest {
        id
        message
      }
    }
    monsters {
      id
      monster {
        id
        name
        level
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function lt(e){const t={...o,...e};return a.D(st,t)}const ct=i.Ps`
    mutation Sail($x: Int!, $y: Int!) {
  sail(x: $x, y: $y) {
    hero {
      id
      gold
      location {
        x
        y
        map
      }
      inventory {
        id
        baseItem
        owner
        name
        type
        level
        enchantment
      }
      currentQuest {
        id
        message
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    monsters {
      id
      monster {
        id
        name
        level
        combat {
          health
          maxHealth
        }
        attackType
      }
    }
  }
}
    `;function ut(e){const t={...o,...e};return a.D(ct,t)}const mt=i.Ps`
    mutation SellResource($resource: String!, $amount: Int!) {
  sellResource(resource: $resource, amount: $amount) {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      gold
      home {
        id
        resources {
          name
          value
          maximum
        }
      }
    }
  }
}
    `;function dt(e){const t={...o,...e};return a.D(mt,t)}const gt=i.Ps`
    mutation SettleCamp {
  settleCamp {
    hero {
      id
      gold
      home {
        id
        location {
          x
          y
          map
        }
        owner
        publicOwner {
          id
          name
          level
          class
          local
          combat {
            health
            maxHealth
          }
        }
        type
        upgrades
        resources {
          name
          value
          maximum
        }
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function ht(e){const t={...o,...e};return a.D(gt,t)}const pt=i.Ps`
    query SettlementManager {
  settlementManager {
    id
    range
    availableUpgrades {
      cost {
        name
        value
      }
      name
      type
    }
    availableBuildings {
      cost {
        name
        value
      }
      description
      name
      type
    }
    capital {
      id
      location {
        x
        y
        map
      }
      upgrades
      resources {
        name
        value
        maximum
      }
      upkeep {
        stone
        wood
        food
        water
      }
      owner
      publicOwner {
        id
        name
        level
        class
        local
        combat {
          health
          maxHealth
        }
      }
      type
      health
      maxHealth
      remainingAttacks
      availableUpgrades {
        cost {
          name
          value
        }
        name
        type
      }
      connections {
        id
        location {
          x
          y
          map
        }
        upgrades
        resources {
          name
          value
          maximum
        }
        owner
        publicOwner {
          id
          name
          level
          class
          local
          combat {
            health
            maxHealth
          }
        }
        type
        health
        maxHealth
        availableUpgrades {
          cost {
            name
            value
          }
          name
          type
        }
      }
    }
    adjacentTiles {
      id
      location {
        x
        y
        map
      }
      owner
      publicOwner {
        id
        name
        level
        class
        local
        combat {
          health
          maxHealth
        }
      }
      type
      health
      maxHealth
    }
  }
}
    `;function ft(e){const t={...o,...e};return r.a(pt,t)}const yt=i.Ps`
    mutation AttackLocation($target: LocationInput!, $units: MilitaryUnitInput!) {
  attackLocation(target: $target, units: $units) {
    target {
      id
      location {
        x
        y
        map
      }
      upgrades
      resources {
        name
        value
        maximum
      }
      owner
      publicOwner {
        id
        name
        level
        class
        local
        combat {
          health
          maxHealth
        }
      }
      type
    }
    damage
    totalDamage
    targetCasualties {
      enlisted
      soldier
      veteran
      ghost
      fortifications
    }
    attackerCasualties {
      enlisted
      soldier
      veteran
      ghost
    }
    account {
      id
      nextAllowedAction
      timeRemaining
      hero {
        id
        home {
          id
          remainingAttacks
        }
      }
    }
  }
}
    `;function xt(e){const t={...o,...e};return a.D(yt,t)}const St=i.Ps`
    mutation BuildBuilding($type: PlayerLocationType!, $location: LocationInput!) {
  buildBuilding(type: $type, location: $location) {
    account {
      id
      nextAllowedAction
      timeRemaining
      hero {
        id
        gold
        home {
          id
          resources {
            name
            value
            maximum
          }
          connections {
            id
            location {
              x
              y
              map
            }
            upgrades
            resources {
              name
              value
              maximum
            }
            owner
            publicOwner {
              id
              name
              level
              class
              local
              combat {
                health
                maxHealth
              }
            }
            type
          }
        }
      }
    }
  }
}
    `;function At(e){const t={...o,...e};return a.D(St,t)}const bt=i.Ps`
    mutation BuildFortifications($location: LocationInput!, $amount: Int!) {
  buildFortifications(location: $location, amount: $amount) {
    location {
      id
      resources {
        name
        value
        maximum
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
      hero {
        id
        gold
      }
    }
  }
}
    `;function wt(e){const t={...o,...e};return a.D(bt,t)}const vt=i.Ps`
    mutation CraftGoldEssences($location: LocationInput!, $greater: Boolean!) {
  craftGoldEssences(location: $location, greater: $greater) {
    location {
      id
      resources {
        name
        value
        maximum
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
      hero {
        id
        gold
        inventory {
          id
          baseItem
          owner
          name
          type
          level
          enchantment
        }
      }
    }
  }
}
    `;function kt(e){const t={...o,...e};return a.D(vt,t)}const Bt=i.Ps`
    mutation CraftHoneyEssences($location: LocationInput!, $amount: Int!) {
  craftHoneyEssences(location: $location, amount: $amount) {
    location {
      id
      resources {
        name
        value
        maximum
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
      hero {
        id
        gold
      }
    }
  }
}
    `;function Dt(e){const t={...o,...e};return a.D(Bt,t)}const Pt=i.Ps`
    mutation DestroyBuilding($location: LocationInput!) {
  destroyBuilding(location: $location) {
    account {
      id
      nextAllowedAction
      timeRemaining
      hero {
        id
        home {
          id
          resources {
            name
            value
            maximum
          }
          connections {
            id
            location {
              x
              y
              map
            }
            upgrades
            resources {
              name
              value
              maximum
            }
            owner
            publicOwner {
              id
              name
              level
              class
              local
              combat {
                health
                maxHealth
              }
            }
            type
          }
        }
      }
    }
  }
}
    `;function $t(e){const t={...o,...e};return a.D(Pt,t)}const It=i.Ps`
    mutation MoveTroups($target: LocationInput!, $units: MilitaryUnitInput!) {
  moveTroups(target: $target, units: $units) {
    location {
      id
      location {
        x
        y
        map
      }
      upgrades
      resources {
        name
        value
        maximum
      }
      owner
      publicOwner {
        id
        name
        level
        class
        local
        combat {
          health
          maxHealth
        }
      }
      type
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function jt(e){const t={...o,...e};return a.D(It,t)}const Wt=i.Ps`
    mutation PurchaseBonds($location: LocationInput!, $amount: Int!) {
  purchaseBonds(location: $location, amount: $amount) {
    location {
      id
      location {
        x
        y
        map
      }
      upgrades
      resources {
        name
        value
        maximum
      }
      owner
      publicOwner {
        id
        name
        level
        class
        local
        combat {
          health
          maxHealth
        }
      }
      type
    }
    account {
      id
      nextAllowedAction
      timeRemaining
      hero {
        id
        gold
      }
    }
  }
}
    `;function Rt(e){const t={...o,...e};return a.D(Wt,t)}const Mt=i.Ps`
    mutation Recruit($location: LocationInput!, $amount: Int!) {
  recruit(location: $location, amount: $amount) {
    location {
      id
      location {
        x
        y
        map
      }
      upgrades
      resources {
        name
        value
        maximum
      }
      owner
      publicOwner {
        id
        name
        level
        class
        local
        combat {
          health
          maxHealth
        }
      }
      type
    }
    account {
      id
      nextAllowedAction
      timeRemaining
      hero {
        id
        gold
      }
    }
  }
}
    `;function Ct(e){const t={...o,...e};return a.D(Mt,t)}const Et=i.Ps`
    mutation Teleport($x: Int!, $y: Int!) {
  teleport(x: $x, y: $y) {
    hero {
      location {
        y
        x
        map
      }
      id
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function Lt(e){const t={...o,...e};return a.D(Et,t)}const Tt=i.Ps`
    mutation UpgradeCamp($upgrade: PlayerLocationUpgrades!) {
  upgradeCamp(upgrade: $upgrade) {
    hero {
      id
      gold
      home {
        id
        upgrades
        resources {
          name
          value
          maximum
        }
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function Ht(e){const t={...o,...e};return a.D(Tt,t)}const Ft=i.Ps`
    query QuestDescription($quest: Quest!) {
  quest(quest: $quest) {
    id
    description
  }
}
    `;function qt(e){const t={...o,...e};return r.a(Ft,t)}const Ut=i.Ps`
    mutation Rebirth {
  rebirth {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      class
      level
      levelCap
      experience
      needed
      gold
      location {
        x
        y
        map
      }
      attributePoints
      combat {
        health
        maxHealth
      }
      stats {
        luck
        willpower
        wisdom
        intelligence
        constitution
        dexterity
        strength
      }
      inventory {
        id
        enchantment
        level
        type
        name
        baseItem
        owner
      }
      questLog {
        rebirth {
          lastEvent {
            quest
            message
            id
          }
          progress
          finished
          started
          id
        }
        id
      }
      currentQuest {
        quest
        message
        id
      }
      combatStats {
        stats {
          luck
          willpower
          wisdom
          intelligence
          constitution
          dexterity
          strength
        }
        enemyStats {
          luck
          willpower
          wisdom
          intelligence
          constitution
          dexterity
          strength
        }
        armorReduction
        armor
        damageAmplification
        physicalResistance
        magicalResistance
        fireResistance
        iceResistance
        lightningResistance
        holyResistance
        blightResistance
        attackRating
        physicalEvasionRating
        magicEvasionRating
        baseDamage
        secondAttackBaseDamage
      }
    }
  }
}
    `;function Zt(e){const t={...o,...e};return a.D(Ut,t)}const Vt=i.Ps`
    mutation RejectArtifact {
  rejectArtifact {
    hero {
      id
      equipment {
        id
        artifact {
          id
          owner
          name
          level
          attributes {
            namePrefix {
              type
              magnitude
            }
            namePostfix {
              type
              magnitude
            }
            titlePrefix {
              type
              magnitude
            }
            titlePostfix {
              type
              magnitude
            }
            bonusAffixes {
              type
              magnitude
            }
          }
        }
      }
      pendingArtifact {
        id
        owner
        name
        level
        attributes {
          namePrefix {
            type
            magnitude
          }
          namePostfix {
            type
            magnitude
          }
          titlePrefix {
            type
            magnitude
          }
          titlePostfix {
            type
            magnitude
          }
          bonusAffixes {
            type
            magnitude
          }
        }
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function Ot(e){const t={...o,...e};return a.D(Vt,t)}const Nt=i.Ps`
    mutation SellItem($item: ID!) {
  sell(item: $item) {
    hero {
      id
      gold
      inventory {
        id
        owner
        baseItem
        name
        type
        level
        enchantment
      }
      equipment {
        id
        accessories {
          id
        }
        footArmor {
          id
        }
        headArmor {
          id
        }
        legArmor {
          id
        }
        handArmor {
          id
        }
        bodyArmor {
          id
        }
        rightHand {
          id
        }
        leftHand {
          id
        }
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
  }
}
    `;function Gt(e){const t={...o,...e};return a.D(Nt,t)}const zt=i.Ps`
    mutation ChangeActiveSkill($skill: HeroSkill!) {
  changeActiveSkill(skill: $skill) {
    hero {
      id
      activeSkill
    }
  }
}
    `;function Qt(e){const t={...o,...e};return a.D(zt,t)}const _t=i.Ps`
    mutation ChangeSkillPercent($percent: Int!) {
  changeSkillPercent(percent: $percent) {
    hero {
      id
      skillPercent
    }
  }
}
    `;function Kt(e){const t={...o,...e};return a.D(_t,t)}const Xt=i.Ps`
    query ShopItems {
  shopItems {
    id
    alias
    name
    cost
    type
    level
  }
}
    `;function Jt(e){const t={...o,...e};return r.a(Xt,t)}const Yt=i.Ps`
    mutation Talk {
  talk {
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      inventory {
        id
        baseItem
        owner
        name
        type
        level
        baseDamage
        baseArmor
        enchantment
        builtIns {
          type
          magnitude
        }
        imbue {
          artifact {
            id
            owner
            name
            level
            attributes {
              namePrefix {
                type
                magnitude
              }
              namePostfix {
                type
                magnitude
              }
              titlePrefix {
                type
                magnitude
              }
              titlePostfix {
                type
                magnitude
              }
              bonusAffixes {
                type
                magnitude
              }
            }
          }
          affixes
        }
      }
    }
    message
  }
}
    `;function en(e){const t={...o,...e};return a.D(Yt,t)}const tn=i.Ps`
    mutation VoidTravel {
  voidTravel {
    monsters {
      id
      location {
        x
        y
        map
      }
      monster {
        level
        id
        name
        terrain
        attackType
        combat {
          maxHealth
          health
        }
      }
    }
    account {
      id
      nextAllowedAction
      timeRemaining
    }
    hero {
      id
      location {
        map
        y
        x
      }
    }
  }
}
    `;function nn(e){const t={...o,...e};return a.D(tn,t)}const an=i.Ps`
    mutation ReadMap($itemId: ID!) {
  readMap(itemId: $itemId) {
    message
    hero {
      id
      location {
        map
        x
        y
      }
    }
    account {
      id
      name
    }
  }
}
    `;function rn(e){const t={...o,...e};return a.D(an,t)}const on=i.Ps`
    query Me {
  me {
    now
    account {
      id
      nextAllowedAction
      timeRemaining
      access
      hero {
        version
        id
        name
        class
        dungeon {
          id
          remaining
          selection
          index
        }
        level
        levelCap
        experience
        needed
        gold
        enchantingDust
        attributePoints
        enchantments
        skillPercent
        activeSkill
        availableAttacks
        buffs {
          blessing
        }
        skills {
          attackingAccuracy
          castingAccuracy
          attackingDamage
          castingDamage
          vitality
          resilience
          regeneration
        }
        location {
          x
          y
          map
        }
        questLog {
          washedUp {
            id
            progress
            finished
            started
            lastEvent {
              quest
              message
              id
            }
            eventHistory {
              id
              quest
              message
            }
          }
          rebirth {
            id
            progress
            finished
            started
            lastEvent {
              quest
              message
              id
            }
            eventHistory {
              id
              quest
              message
            }
          }
          droop {
            id
            progress
            finished
            started
            lastEvent {
              quest
              message
              id
            }
            eventHistory {
              id
              quest
              message
            }
          }
          clockwork {
            id
            progress
            finished
            started
            lastEvent {
              quest
              message
              id
            }
            eventHistory {
              id
              quest
              message
            }
          }
          settlements {
            id
            progress
            finished
            started
            lastEvent {
              quest
              message
              id
            }
            eventHistory {
              id
              quest
              message
            }
          }
          tavernChampion {
            id
            progress
            finished
            started
            lastEvent {
              quest
              message
              id
            }
            eventHistory {
              id
              quest
              message
            }
          }
          meetTheQueen {
            id
            progress
            finished
            started
            lastEvent {
              quest
              message
              id
            }
            eventHistory {
              id
              quest
              message
            }
          }
          tasteForBusiness {
            id
            progress
            finished
            started
            lastEvent {
              quest
              message
              id
            }
            eventHistory {
              id
              quest
              message
            }
          }
          nagaScale {
            id
            progress
            finished
            started
            lastEvent {
              quest
              message
              id
            }
            eventHistory {
              id
              quest
              message
            }
          }
          id
        }
        currentQuest {
          quest
          message
          id
        }
        inventory {
          id
          baseItem
          owner
          name
          type
          level
          baseDamage
          baseArmor
          enchantment
          builtIns {
            type
            magnitude
          }
          imbue {
            artifact {
              id
              owner
              name
              level
              attributes {
                namePrefix {
                  type
                  magnitude
                }
                namePostfix {
                  type
                  magnitude
                }
                titlePrefix {
                  type
                  magnitude
                }
                titlePostfix {
                  type
                  magnitude
                }
                bonusAffixes {
                  type
                  magnitude
                }
              }
            }
            affixes
          }
        }
        equipment {
          id
          accessories {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
            builtIns {
              type
              magnitude
            }
            imbue {
              artifact {
                id
                owner
                name
                level
                attributes {
                  namePrefix {
                    type
                    magnitude
                  }
                  namePostfix {
                    type
                    magnitude
                  }
                  titlePrefix {
                    type
                    magnitude
                  }
                  titlePostfix {
                    type
                    magnitude
                  }
                  bonusAffixes {
                    type
                    magnitude
                  }
                }
              }
              affixes
            }
          }
          footArmor {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
            builtIns {
              type
              magnitude
            }
            imbue {
              artifact {
                id
                owner
                name
                level
                attributes {
                  namePrefix {
                    type
                    magnitude
                  }
                  namePostfix {
                    type
                    magnitude
                  }
                  titlePrefix {
                    type
                    magnitude
                  }
                  titlePostfix {
                    type
                    magnitude
                  }
                  bonusAffixes {
                    type
                    magnitude
                  }
                }
              }
              affixes
            }
          }
          headArmor {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
            builtIns {
              type
              magnitude
            }
            imbue {
              artifact {
                id
                owner
                name
                level
                attributes {
                  namePrefix {
                    type
                    magnitude
                  }
                  namePostfix {
                    type
                    magnitude
                  }
                  titlePrefix {
                    type
                    magnitude
                  }
                  titlePostfix {
                    type
                    magnitude
                  }
                  bonusAffixes {
                    type
                    magnitude
                  }
                }
              }
              affixes
            }
          }
          legArmor {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
            builtIns {
              type
              magnitude
            }
            imbue {
              artifact {
                id
                owner
                name
                level
                attributes {
                  namePrefix {
                    type
                    magnitude
                  }
                  namePostfix {
                    type
                    magnitude
                  }
                  titlePrefix {
                    type
                    magnitude
                  }
                  titlePostfix {
                    type
                    magnitude
                  }
                  bonusAffixes {
                    type
                    magnitude
                  }
                }
              }
              affixes
            }
          }
          handArmor {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
            builtIns {
              type
              magnitude
            }
            imbue {
              artifact {
                id
                owner
                name
                level
                attributes {
                  namePrefix {
                    type
                    magnitude
                  }
                  namePostfix {
                    type
                    magnitude
                  }
                  titlePrefix {
                    type
                    magnitude
                  }
                  titlePostfix {
                    type
                    magnitude
                  }
                  bonusAffixes {
                    type
                    magnitude
                  }
                }
              }
              affixes
            }
          }
          bodyArmor {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
            builtIns {
              type
              magnitude
            }
            imbue {
              artifact {
                id
                owner
                name
                level
                attributes {
                  namePrefix {
                    type
                    magnitude
                  }
                  namePostfix {
                    type
                    magnitude
                  }
                  titlePrefix {
                    type
                    magnitude
                  }
                  titlePostfix {
                    type
                    magnitude
                  }
                  bonusAffixes {
                    type
                    magnitude
                  }
                }
              }
              affixes
            }
          }
          rightHand {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
            builtIns {
              type
              magnitude
            }
            imbue {
              artifact {
                id
                owner
                name
                level
                attributes {
                  namePrefix {
                    type
                    magnitude
                  }
                  namePostfix {
                    type
                    magnitude
                  }
                  titlePrefix {
                    type
                    magnitude
                  }
                  titlePostfix {
                    type
                    magnitude
                  }
                  bonusAffixes {
                    type
                    magnitude
                  }
                }
              }
              affixes
            }
          }
          leftHand {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
            builtIns {
              type
              magnitude
            }
            imbue {
              artifact {
                id
                owner
                name
                level
                attributes {
                  namePrefix {
                    type
                    magnitude
                  }
                  namePostfix {
                    type
                    magnitude
                  }
                  titlePrefix {
                    type
                    magnitude
                  }
                  titlePostfix {
                    type
                    magnitude
                  }
                  bonusAffixes {
                    type
                    magnitude
                  }
                }
              }
              affixes
            }
          }
          artifact {
            id
            owner
            name
            level
            attributes {
              namePrefix {
                type
                magnitude
              }
              namePostfix {
                type
                magnitude
              }
              titlePrefix {
                type
                magnitude
              }
              titlePostfix {
                type
                magnitude
              }
              bonusAffixes {
                type
                magnitude
              }
            }
          }
        }
        pendingArtifact {
          id
          owner
          name
          level
          attributes {
            namePrefix {
              type
              magnitude
            }
            namePostfix {
              type
              magnitude
            }
            titlePrefix {
              type
              magnitude
            }
            titlePostfix {
              type
              magnitude
            }
            bonusAffixes {
              type
              magnitude
            }
          }
        }
        combat {
          health
          maxHealth
        }
        stats {
          dexterity
          intelligence
          willpower
          constitution
          wisdom
          luck
          strength
        }
        combatStats {
          damageAmplification
          armor
          armorReduction
          enemyStats {
            luck
            willpower
            wisdom
            intelligence
            constitution
            strength
            dexterity
          }
          stats {
            willpower
            constitution
            dexterity
            intelligence
            luck
            strength
            wisdom
          }
          physicalResistance
          magicalResistance
          fireResistance
          iceResistance
          lightningResistance
          holyResistance
          blightResistance
          attackRating
          physicalEvasionRating
          magicEvasionRating
          baseDamage
          secondAttackBaseDamage
        }
        outgoingTrades {
          gold
          item {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
          }
          toName
          toId
          fromName
          fromId
          id
        }
        incomingTrades {
          gold
          item {
            id
            baseItem
            owner
            name
            type
            level
            enchantment
          }
          toName
          toId
          fromName
          fromId
          id
        }
        settings {
          autoDust
          minimumStats {
            constitution
            dexterity
            intelligence
            luck
            strength
            willpower
            wisdom
          }
        }
        home {
          id
          location {
            x
            y
            map
          }
          upgrades
          resources {
            name
            value
            maximum
          }
          upkeep {
            stone
            wood
            food
            water
          }
          owner
          publicOwner {
            id
            name
            level
            class
            local
            combat {
              health
              maxHealth
            }
          }
          type
          connections {
            id
            location {
              x
              y
              map
            }
            upgrades
            resources {
              name
              value
              maximum
            }
            owner
            publicOwner {
              id
              name
              level
              class
              local
              combat {
                health
                maxHealth
              }
            }
            type
            availableUpgrades {
              cost {
                name
                value
              }
              name
              type
            }
          }
        }
        activeStance
        availableStances
      }
    }
  }
}
    `;function sn(e){const t={...o,...e};return r.a(on,t)}},1789:function(e,t,n){n.d(t,{GJ:function(){return c},Hd:function(){return f},Ke:function(){return x},LW:function(){return u},Lt:function(){return s},OB:function(){return p},Vy:function(){return a},h8:function(){return S},jj:function(){return d},jr:function(){return g},kJ:function(){return y},mQ:function(){return b},qh:function(){return m},r_:function(){return h},uD:function(){return l},v4:function(){return A},xq:function(){return r}});var i=n(6066);function a(e){const t=[e.attributes.namePrefix,e.attributes.namePostfix,...e.attributes.bonusAffixes];return e.attributes.titlePrefix&&t.push(e.attributes.titlePrefix),e.attributes.titlePostfix&&t.push(e.attributes.titlePostfix),t}function r(e){const t=e.magnitude>1?Math.round(1e3*(e.magnitude-1))/10+"%":Math.round(1e3*e.magnitude)/10+"%";switch(e.type){case i.WBn.BonusStrength:return`${t} increased strength`;case i.WBn.BonusDexterity:return`${t} increased dexterity`;case i.WBn.BonusConstitution:return`${t} increased constitution`;case i.WBn.BonusIntelligence:return`${t} increased intelligence`;case i.WBn.BonusWisdom:return`${t} increased wisdom`;case i.WBn.BonusWillpower:return`${t} increased willpower`;case i.WBn.BonusLuck:return`${t} increased luck`;case i.WBn.DamageReduction:return`${t} reduced damage taken`;case i.WBn.EnhancedDamage:return`${t} enhanced damage`;case i.WBn.BonusHealth:return`${t} bonus max health`;case i.WBn.ReducedDelay:return`${t} reduced delay on actions`;case i.WBn.BonusExperience:return`${t} more experience from all sources`;case i.WBn.BonusSkillChance:return`${t} bonus chance to increase skills`;case i.WBn.Lifesteal:return`${t} damage dealt gained as health`;case i.WBn.Mesmerize:return`${t} chance to mesmerize opponents`;case i.WBn.Focus:return`${t} chance to resist mesmerizing`;case i.WBn.AllResistances:return`${t} to all resistances`;case i.WBn.DamageAsPhysical:return`${t} damage converted to physical`;case i.WBn.DamageAsMagical:return`${t} damage converted to magical`;case i.WBn.DamageAsFire:return`${t} damage converted to fire`;case i.WBn.DamageAsIce:return`${t} damage converted to ice`;case i.WBn.DamageAsLightning:return`${t} damage converted to lightning`;case i.WBn.DamageAsHoly:return`${t} damage converted to holy`;case i.WBn.DamageAsBlight:return`${t} damage converted to blight`;case i.WBn.PhysicalResistance:return`${t} to physical resistance`;case i.WBn.MagicalResistance:return`${t} to magical resistance`;case i.WBn.FireResistance:return`${t} to fire resistance`;case i.WBn.IceResistance:return`${t} to ice resistance`;case i.WBn.LightningResistance:return`${t} to lightning resistance`;case i.WBn.HolyResistance:return`${t} to holy resistance`;case i.WBn.BlightResistance:return`${t} to blight resistance`;case i.WBn.BonusPhysicalDamage:return`${t} bonuus physical damage`;case i.WBn.BonusMagicalDamage:return`${t} bonuus magical damage`;case i.WBn.BonusFireDamage:return`${t} bonuus fire damage`;case i.WBn.BonusIceDamage:return`${t} bonuus ice damage`;case i.WBn.BonusLightningDamage:return`${t} bonuus lightning damage`;case i.WBn.BonusHolyDamage:return`${t} bonuus holy damage`;case i.WBn.BonusBlightDamage:return`${t} bonuus blight damage`;case i.WBn.EnemyPhysicalResistance:return`-${t} to enemy physical resistance`;case i.WBn.EnemyMagicalResistance:return`-${t} to enemy magical resistance`;case i.WBn.EnemyFireResistance:return`-${t} to enemy fire resistance`;case i.WBn.EnemyIceResistance:return`-${t} to enemy ice resistance`;case i.WBn.EnemyLightningResistance:return`-${t} to enemy lightning resistance`;case i.WBn.EnemyHolyResistance:return`-${t} to enemy holy resistance`;case i.WBn.EnemyBlightResistance:return`-${t} to enemy blight resistance`;case i.WBn.ItemBonusArmor:return`${t} increased armor (this item)`;case i.WBn.ItemFlatArmor:return`${Math.round(e.magnitude)} flat armor (this item)`;case i.WBn.ItemBonusDamage:return`${t} increased base damage (this weapon only)`;case i.WBn.ItemFlatDamage:return`${Math.round(e.magnitude)} flat base damage (this weapon only)`}return function(e){throw new Error(`Unhandled case: ${String(e)}`)}(e.type)}const o={[i.kjr.BonusStrength]:"Giant's Strength",[i.kjr.BonusDexterity]:"Incredible Speed",[i.kjr.BonusConstitution]:"Sturdiness",[i.kjr.BonusIntelligence]:"Intellect",[i.kjr.BonusWisdom]:"Incredible Will",[i.kjr.BonusWillpower]:"The Bard",[i.kjr.BonusLuck]:"The Gambler",[i.kjr.BonusPhysical]:"Physical Superiority",[i.kjr.BonusMental]:"Mental Superiority",[i.kjr.BonusAllStats]:"Absolute Power",[i.kjr.MinusEnemyArmor]:"Armor Piercing",[i.kjr.BonusArmor]:"Deflection",[i.kjr.MinusEnemyStrength]:"Crippling Strength",[i.kjr.MinusEnemyDexterity]:"Frost",[i.kjr.MinusEnemyConstitution]:"Mortality",[i.kjr.MinusEnemyIntelligence]:"Stupification",[i.kjr.MinusEnemyWisdom]:"The Feeble Minded",[i.kjr.MinusEnemyWillpower]:"Truth",[i.kjr.MinusEnemyPhysical]:"Physical Destruction",[i.kjr.MinusEnemyMental]:"Mental Destruction",[i.kjr.MinusEnemyAllStats]:"Complete Oppression",[i.kjr.LifeHeal]:"Healing",[i.kjr.LifeDamage]:"Harming",[i.kjr.LifeSteal]:"The Leech",[i.kjr.StrengthSteal]:"Stolen Strength",[i.kjr.DexteritySteal]:"Thieves Hands",[i.kjr.ConstitutionSteal]:"Siphoning",[i.kjr.IntelligenceSteal]:"Revealed Thoughts",[i.kjr.WisdomSteal]:"Swindling",[i.kjr.WillpowerSteal]:"Persuasion",[i.kjr.LuckSteal]:"The Trickster",[i.kjr.AllStatsSteal]:"Soul Absorption",[i.kjr.Vampirism]:"Vampirism",[i.kjr.BigMelee]:"The Warrior",[i.kjr.BigCaster]:"The Sorcerer",[i.kjr.WisDexWill]:"The Monk",[i.kjr.CounterSpell]:"Countering",[i.kjr.SuperDexterity]:"Putrid Speed",[i.kjr.SuperWillpower]:"Unallowable Willpower",[i.kjr.SuperWisdom]:"Impermissible Wisdom",[i.kjr.SuperMelee]:"Vicious Slaughtering",[i.kjr.SuperCaster]:"Godly Magic",[i.kjr.SuperMeleeVamp]:"Bloodletting",[i.kjr.SuperSorcVamp]:"Bookburning",[i.kjr.SuperVamp]:"Nosferatu's Breath",[i.kjr.SuperVampMelee]:"Flesh Consumption",[i.kjr.SuperVampSorc]:"Necrotic Consumption",[i.kjr.SuperBattleMage]:"Demon Hunting",[i.kjr.SuperAllStats]:"Overwhelming Power"};function s(e){switch(e){case"fishermans-strength":return"+50% Strength";case"fishermans-dexterity":return"+50% Dexterity";case"fishermans-constitution":return"+50% Constitution";case"fishermans-intelligence":return"+50% Intelligence";case"fishermans-wisdom":return"+50% Wisdom";case"fishermans-willpower":return"+50% Willpower";case"fishermans-luck":return"+50% Luck";case"totem-of-champion":return"+Level cap, auto-battler, +100% XP";case"totem-of-hero":return"2x Leveling rate, +Level cap, auto-battler, +100% XP";case"warriors-armlette":return"Upgrades Fighter and Berserker classes";case"tome-of-knowledge":return"Upgrades Wizard and Warlock classes";case"quiver-of-speed":return"Upgrades Ranger class";case"vampire-ring":return"Upgrades Blood Mage class";case"gambling-kit":return"Upgrades Gambler class";case"patrons-wisdom":return"Upgrades Battle Mage class";case"liturgical-censer":return"Upgrades Paladin class";case"dont-get-hit":return"Double dodge, double accuracy";case"aqua-lungs":return"Allows water travel";case"trophy-hellhound":return"2x All Stats, +1 Weapon Tier";case"trophy-hiddenstump":return"2x All Stats, 2x Dodge";case"trophy-steamgear":return"2x All Stats, Improved auto-battler";case"trophy-drowning":return"2x All Stats, +1 Armor Tier";case"archers-impatience":return"50% Double Shot";case"archers-determination":return"Ranged -20% Armor, 50% Double Shot";case"archers-balance":return"+1 Ranged Weapon Tier, Ranged -20% Armor, +50% Second Attack";case"attackers-precision":return"+30% Dexterity";case"attackers-honor":return"Melee -20% Armor, +30% Dexterity";case"attackers-warbanner":return"+1 Melee Weapon Tier, Melee -20% Armor, +30% Dexterity";case"casters-book":return"+30% Wisdom";case"casters-wisdom":return"Caster -20% Armor, +30% Wisdom";case"casters-destiny":return"+1 Spell Focus Tier, Caster -20% Armor, +30% Wisdom";case"smiters-inspiration":return"+30% Willpower";case"smiters-calling":return"Smite -20% Armor, +30% Willpower";case"smiters-light":return"+1 Shield Tier, Smite -20% Armor, +30% Willpower";case"vampires-blood":return"+30% Constitution";case"vampires-gaze":return"-50% Enemy Enchantment Resist, +30% Constitution";case"vampires-darkness":return"-75% Enemy Enchantment Resist, +30% Constitution";case"naga-scale":return"Cancels out 1 enemy enchantment";case"unimaginable-gearbox":return"Improved auto-battler";case"circle-of-protection":return"Counter Spell";case"circle-of-hexing":return"3x Counter Spell";case"ashen-circle-of-hexing":return"+1 Weapon Tier, 3x Counter Spell";case"shadow-circle-of-hexing":return"5x Counter Spell";case"thorny-circle-of-hexing":return"+1 Armor Tier, 3x Counter Spell";case"totem-of-champion-rebirth":case"totem-of-hero-rebirth":case"totem-of-rebirth":return"Select to show rebirth menu";case"orb-of-forbidden-power":return"A combination of all you've worked for";case"crafting-hammer":return"Select to show crafting menu";case"void-vessel":return"Select to show void travel";case"treasure-map":return"Select to read the map";case"crafting-goggles":return"Allows sorting and bulk crafting";case"heros-guidance":return"+44% All Stats, -75% Enemy Enchantment Resist, -50% Enemy Armor, +1 Weapon Tier, +50% Ranged Second Attack, +Max gold";case i.kjr.BonusStrength:return"+30% Strength";case i.kjr.BonusDexterity:return"+30% Dexterity";case i.kjr.BonusConstitution:return"+30% Constitution";case i.kjr.BonusIntelligence:return"+30% Intelligence";case i.kjr.BonusWisdom:return"+30% Wisdom";case i.kjr.BonusWillpower:return"+30% Willpower";case i.kjr.BonusLuck:return"+30% Luck";case i.kjr.BonusPhysical:return"+20% Strength, Dexterity, Constitution";case i.kjr.BonusMental:return"+20% Intelligence, Wisdom, Willpower";case i.kjr.BonusAllStats:return"+20% All Stats";case i.kjr.MinusEnemyArmor:return"-50% Enemy Armor";case i.kjr.BonusArmor:return"+100% Armor";case i.kjr.MinusEnemyStrength:return"-20% Enemy Strength";case i.kjr.MinusEnemyDexterity:return"-20% Enemy Dexterity";case i.kjr.MinusEnemyConstitution:return"-20% Enemy Constitution";case i.kjr.MinusEnemyIntelligence:return"-20% Enemy Intelligence";case i.kjr.MinusEnemyWisdom:return"-20% Enemy Wisdom";case i.kjr.MinusEnemyWillpower:return"-20% Enemy Willpower";case i.kjr.MinusEnemyPhysical:return"-10% Enemy Strength, Dexterity, Constitution";case i.kjr.MinusEnemyMental:return"-10% Enemy Intelligence, Wisdom, Willpower";case i.kjr.MinusEnemyAllStats:return"-10% All Enemy Stats";case i.kjr.LifeHeal:return"Heal 10% Constitution";case i.kjr.LifeDamage:return"Damage 10% Constitution";case i.kjr.LifeSteal:return"Leech 10% Constitution";case i.kjr.Vampirism:return"Leech 20% Constitution, Steal 30% Constitution";case i.kjr.BigMelee:return"+100% Strength, Steal 40% Dexterity";case i.kjr.BigCaster:return"+100% Intelligence, Steal 40% Wisdom";case i.kjr.WisDexWill:return"+40% Wisdom, Dexterity, Willpower";case i.kjr.StrengthSteal:return"Steal 30% Strength";case i.kjr.DexteritySteal:return"Steal 30% Dexterity";case i.kjr.ConstitutionSteal:return"Steal 30% Constitution";case i.kjr.IntelligenceSteal:return"Steal 30% Intelligence";case i.kjr.WisdomSteal:return"Steal 30% Wisdom";case i.kjr.WillpowerSteal:return"Steal 30% Willpower";case i.kjr.LuckSteal:return"Steal 30% Luck";case i.kjr.AllStatsSteal:return"Steal 30% All Stats";case i.kjr.CounterSpell:return"Cancels out 1 enemy enchantment";case i.kjr.SuperDexterity:return"+200% Dexterity, +50% Willpower/Wisdom, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperWillpower:return"+200% Willpower, +50% Dexterity/Wisdom, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperWisdom:return"+200% Wisdom, +50% Willpower/Dexterity, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperMelee:return"+250% Strength, Steal 80% Dexterity, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperCaster:return"+250% Intelligence, Steal 80% Wisdom, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperMeleeVamp:return"+200% Strength, Steal 50% Dexterity/Constitution, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperSorcVamp:return"+200% Intelligence, Steal 50% Wisdom/Constitution, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperVamp:return"Leech 50% Constitution, Steal 80% Constitution, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperVampMelee:return"+150% Strength, Steal 60% Dexterity/Constitution, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperVampSorc:return"+150% Intelligence, Steal 60% Wisdom/Constitution, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperBattleMage:return"+150% Strength/Intelligence, Steal 60% Dexterity/Wisdom, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.SuperAllStats:return"+100% All Stats, Leech 20% Constitution, CounterSpell, Minus Armor, Bonus Armor";case i.kjr.RubyBlessing:return"+20% Physical Resistance";case i.kjr.EmeraldBlessing:return"+20% Magical Resistance";case i.kjr.SapphireBlessing:return"+20% Elemental Resistance";case i.kjr.DiamondBlessing:return"+10% All Resistances";default:return"???"}}function l(e){return o[e]??m(e)}function c(e,t=e.enchantment){const n=(e.builtIns||[]).length>0?"\u2605 ":"";return e.imbue?t?`${n}${e.imbue.artifact.name} ${e.name} *${l(t)}*`:`${n}${e.imbue.artifact.name} ${e.name}`:t?`${n}${i=e.name,a=t,`${i} of ${o[a]??"The Unknown"}`}`:`${n}${e.name}`;var i,a}function u(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function m(e){return e.split(/(?=[A-Z])/g).filter((e=>e.length)).join(" ")}function d(e){return"void-vessel"===e}function g(e){return"totem-of-rebirth"===e||("totem-of-hero-rebirth"===e||("totem-of-champion-rebirth"===e||"orb-of-forbidden-power"===e))}function h(e){return"unimaginable-gearbox"===e||("orb-of-forbidden-power"===e||"cracked-orb-of-forbidden-power"===e)}function p(e){return"crafting-hammer"===e}function f(e){return"treasure-map"===e}function y(e){return"crafting-goggles"===e}function x(e){return"orb-of-forbidden-power"===e||"cracked-orb-of-forbidden-power"===e}function S(e){return"totem-of-hero"===e||("totem-of-hero-rebirth"===e||("totem-of-champion"===e||("totem-of-champion-rebirth"===e||("orb-of-forbidden-power"===e||"cracked-orb-of-forbidden-power"===e))))}function A(e,t){return e.level!==t.level?e.level-t.level:e.name>t.name?1:t.name>e.name?-1:e.enchantment&&t.enchantment?e.enchantment>t.enchantment?1:t.enchantment>e.enchantment?-1:0:0}function b(e,t){return!(!e.equipment.leftHand?.id||e.equipment.leftHand.id!==t.id)||(!(!e.equipment.rightHand?.id||e.equipment.rightHand.id!==t.id)||(!(!e.equipment.bodyArmor?.id||e.equipment.bodyArmor.id!==t.id)||(!(!e.equipment.handArmor?.id||e.equipment.handArmor.id!==t.id)||(!(!e.equipment.legArmor?.id||e.equipment.legArmor.id!==t.id)||(!(!e.equipment.headArmor?.id||e.equipment.headArmor.id!==t.id)||!(!e.equipment.footArmor?.id||e.equipment.footArmor.id!==t.id))))))}},1767:function(e,t,n){n.d(t,{d:function(){return o}});var i=n(7294);const a=["undefined"!==typeof sessionStorage?sessionStorage.token??null:null,e=>{a[0]=e,"undefined"!==typeof sessionStorage&&(sessionStorage.token=e)}],r=i.createContext(a);function o(){return i.useContext(r)}}}]);