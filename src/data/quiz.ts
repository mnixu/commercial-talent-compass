import type { QuizQuestion } from '../types/quiz'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scene: '周末生活洞察',
    title: '周末闲逛文创手作市集，以下哪种摊位或现象最容易激发你的兴奋感？',
    context: '置身于人头攒动的市集，你的商业雷达会最先锁定什么？',
    options: [
      {
        id: '1A',
        text: '摊主把普通的陶艺杯拍得像艺术展，配上诗意文案，标价翻了5倍依然有人排队买单',
        subtext: '产品包装与美学溢价',
        scores: { product: 3, emotion: 1 }
      },
      {
        id: '1B',
        text: '某个摊位搞了趣味互动打卡装置，引来几十个小红书博主自发排队拍照发笔记',
        subtext: '流量引力与情绪爆点',
        scores: { traffic: 3, emotion: 1 }
      },
      {
        id: '1C',
        text: '一眼发现摊位上的皮具其实是某地原产地代工，立刻盘算起批发底价与差价空间',
        subtext: '信息差挖掘与套利直觉',
        scores: { insight: 3, resource: 1 }
      },
      {
        id: '1D',
        text: '摊主一个人轻松应对几百位客人，包装、收款、社群引流全套流程像流水线一样丝滑',
        subtext: '标准化交付与高效率',
        scores: { execution: 3, resource: 1 }
      }
    ]
  },
  {
    id: 2,
    scene: '职场破局应对',
    title: '团队接了一个预算极其紧张、但要求极高的项目，你的破局第一招是？',
    context: '资源匮乏时刻，最能暴露出你最习惯依赖的核心武器。',
    options: [
      {
        id: '2A',
        text: '梳理我的人脉圈与合作方，找能资源置换的外部伙伴，借力打力完成目标',
        subtext: '善用人脉杠杆与资源协同',
        scores: { resource: 3, insight: 1 }
      },
      {
        id: '2B',
        text: '重新包装项目定位与立意，提炼出让人眼前一亮的超级概念，让客户眼前一亮',
        subtext: '升维定义与概念点金',
        scores: { product: 3, insight: 1 }
      },
      {
        id: '2C',
        text: '深挖目标受众的痛点情绪，把预算集中砸在最能让用户走心尖叫的单一触点上',
        subtext: '情绪共鸣与关键心智占领',
        scores: { emotion: 3, traffic: 1 }
      },
      {
        id: '2D',
        text: '立刻拆解甘特图与 SOP，砍掉一切花架子冗余流程，用极限效率完成硬核交付',
        subtext: '流程优化与雷厉风行',
        scores: { execution: 3, resource: 1 }
      }
    ]
  },
  {
    id: 3,
    scene: '商业实战建议',
    title: '好友打算辞职开一家独立烘焙咖啡店，找你做顾问，你给出的第一个灵魂质问是？',
    context: '面对轻资产与重资产的选择，你的商业直觉在哪里？',
    options: [
      {
        id: '3A',
        text: '“你的门头、杯套和甜品拍照发小红书够不够出片？第一天能否引发自发刷屏？”',
        subtext: '关注天然自传播与公域流量',
        scores: { traffic: 3, product: 1 }
      },
      {
        id: '3B',
        text: '“附近写字楼的物业和社群群主能不能谈成分销？能不能借别人的流量池卖咖啡？”',
        subtext: '关注渠道杠杆与异业合作',
        scores: { resource: 3, insight: 1 }
      },
      {
        id: '3C',
        text: '“你的招牌手冲能不能包装成一个情绪故事？能不能让客人觉得喝的不是咖啡而是松弛感？”',
        subtext: '关注高溢价包装与情绪粘性',
        scores: { product: 2, emotion: 2 }
      },
      {
        id: '3D',
        text: '“你算过单杯豆子的损耗率和出杯标准SOP没有？怎么确保请的新人也能稳定出品？”',
        subtext: '关注成本精算与交付标准化',
        scores: { execution: 3, insight: 1 }
      }
    ]
  },
  {
    id: 4,
    scene: '副业起盘定位',
    title: '如果今晚就必须启动一个小红书副业账号，你最倾向于用什么方式冷启动？',
    context: '什么样的创作路径能让你进入“停不下来的心流”？',
    options: [
      {
        id: '4A',
        text: '搜罗全网近期爆火的几十个选题，用最抓人眼球的封面和情绪标题迅速测出爆款',
        subtext: '追击热点与爆款网感',
        scores: { traffic: 3, insight: 1 }
      },
      {
        id: '4B',
        text: '设计一套统一且高级感满满的视觉模板，把自己的专业干货梳理成系列化知识手册',
        subtext: '视觉美学与体系化产品',
        scores: { product: 3, execution: 1 }
      },
      {
        id: '4C',
        text: '真诚记录自己的真实心路与转折故事，在评论区和私信认真陪聊，培养深度铁粉',
        subtext: '走心陪伴与深度信任',
        scores: { emotion: 3, resource: 1 }
      },
      {
        id: '4D',
        text: '寻找海外或小众平台的高潜内容，做本土化翻译与精华提炼，赚取信息差认知红利',
        subtext: '降维搬运与信息套利',
        scores: { insight: 3, traffic: 1 }
      }
    ]
  },
  {
    id: 5,
    scene: '变现直觉触发',
    title: '你偶然掌握了一门小众技能（如 Notion 搭建自动化知识库），你的第一变现本能是？',
    context: '如何将个人技能放大成为可规模化的商业价值？',
    options: [
      {
        id: '5A',
        text: '制作成可以直接一键复制的高颜值模板，挂在小红书或各大平台做被动发售',
        subtext: '数字资产与被动收入',
        scores: { product: 3, execution: 1 }
      },
      {
        id: '5B',
        text: '寻找几位粉丝量大但内容杂乱的博主，免费帮他们整理，换取在他们主页的挂名推荐',
        subtext: '杠杆借势与声量互换',
        scores: { resource: 3, traffic: 1 }
      },
      {
        id: '5C',
        text: '面向追求秩序感的职场女性，开展 1v1 梳理陪伴咨询，帮她们解决生活失控感',
        subtext: '高客单情感咨询陪伴',
        scores: { emotion: 3, insight: 1 }
      },
      {
        id: '5D',
        text: '把实操过程录成系列免费短视频，在每一期留悬念打入私域群，批量沉淀公域流量',
        subtext: '公域引流与漏斗漏斗搭建',
        scores: { traffic: 3, execution: 1 }
      }
    ]
  },
  {
    id: 6,
    scene: '人际交往隐形筹码',
    title: '参加一场同行或副业同好的线下聚会，你最享受在交谈中扮演什么角色？',
    context: '社交磁场中，你的核心影响力来源是什么？',
    options: [
      {
        id: '6A',
        text: '“连接器”：听到 A 的需求和 B 的技能刚好匹配，忍不住当场为他们引荐搭线',
        subtext: '人脉撮合与资源链接',
        scores: { resource: 3, insight: 1 }
      },
      {
        id: '6B',
        text: '“倾听智囊”：耐心地听别人倒苦水，总能敏锐抚平对方的焦虑，并给出走心暖意',
        subtext: '治愈共情与高亲和力',
        scores: { emotion: 3, product: 1 }
      },
      {
        id: '6C',
        text: '“情报雷达”：分享行业最新的前沿工具、冷门赚钱机会和信息差，引来全场专注笔记',
        subtext: '前瞻情报与商业嗅觉',
        scores: { insight: 3, traffic: 1 }
      },
      {
        id: '6D',
        text: '“落地导师”：当大家在天马行空胡侃时，你总能一针见血帮大家梳理落地的第一二三步',
        subtext: '极速拆解与执行实操',
        scores: { execution: 3, product: 1 }
      }
    ]
  },
  {
    id: 7,
    scene: '商业重塑能力',
    title: '有一款成本仅 15 元的手工精油皂，如果你要把它卖出 98 元，你的策略是？',
    context: '如何构建一个让用户不觉得贵、反而觉得赚到的商业提案？',
    options: [
      {
        id: '7A',
        text: '换上磨砂特种纸与手写火漆印章包装，命名为“周五晚九点·情绪卸载仪式皂”',
        subtext: '概念升维与美学赋能',
        scores: { product: 3, emotion: 1 }
      },
      {
        id: '7B',
        text: '找 20 位有失眠焦虑的调香博主送样测评，带起“睡前闻它能一觉到天亮”的种草狂潮',
        subtext: '痛点营销与流量破圈',
        scores: { traffic: 3, emotion: 1 }
      },
      {
        id: '7C',
        text: '打包成企业高端工会伴手礼或瑜伽馆联名定制款，走 B 端批量订购渠道出货',
        subtext: '大客户渠道与批量借力',
        scores: { resource: 3, insight: 1 }
      },
      {
        id: '7D',
        text: '打通原产地冷压橄榄油直供溯源，给出实验室级别成分检测卡，凸显极致纯粹与品质',
        subtext: '品质信任与硬核交付',
        scores: { execution: 2, insight: 2 }
      }
    ]
  },
  {
    id: 8,
    scene: '困境应对韧性',
    title: '你策划的一次线上课程或产品发售，前三天销量远低于预期，你会怎么做？',
    context: '逆境之下的决策定力，映射出你的底层抗打击思维。',
    options: [
      {
        id: '8A',
        text: '一对一私信已经咨询过的几位潜在用户，深聊半小时，找出阻碍他们下单的真实顾虑',
        subtext: '近距离倾听与深度挽回',
        scores: { emotion: 3, insight: 1 }
      },
      {
        id: '8B',
        text: '立即复盘封面和首屏文案，换掉沉闷的学术说教，改换成更刺激痛点的反常识标题',
        subtext: '极速调整封面与吸睛表达',
        scores: { traffic: 3, product: 1 }
      },
      {
        id: '8C',
        text: '找两位同领域的博主朋友，给出 50% 的丰厚分佣比例，请他们协助联合推荐',
        subtext: '分润激励与借力突围',
        scores: { resource: 3, execution: 1 }
      },
      {
        id: '8D',
        text: '快速把原课程拆出更低门槛的“体验版”，优化交付步骤，先让大家低成本体验口碑',
        subtext: '轻量化重构与敏捷交付',
        scores: { execution: 3, product: 1 }
      }
    ]
  },
  {
    id: 9,
    scene: '商业嗅觉与信息差',
    title: '当你看到一条冷门新闻“某款小众宠物用品在北美亚马逊卖断货”，你的反应是？',
    context: '发现萌芽期趋势，你的本能反应速度有多快？',
    options: [
      {
        id: '9A',
        text: '立刻去 1688 和国内源头工厂查底价，看看国内平台是否有同类爆品或降维空间',
        subtext: '信息差敏锐与跨平台比价',
        scores: { insight: 3, resource: 1 }
      },
      {
        id: '9B',
        text: '敏锐思考国内养宠年轻人的情感痛点，抢先在小红书发一篇测评种草笔记测试热度',
        subtext: '情绪洞察与热度先行',
        scores: { traffic: 3, emotion: 1 }
      },
      {
        id: '9C',
        text: '琢磨这款产品背后折射出的全新生活方式，思考能否把它改造成针对独居青年的新概念',
        subtext: '生活理念抽象与概念孵化',
        scores: { product: 3, insight: 1 }
      },
      {
        id: '9D',
        text: '先别冲动，迅速建立一张包含物流、关税、退换货率的测算表格，验证可行性',
        subtext: '稳健测算与精细化风控',
        scores: { execution: 3, insight: 1 }
      }
    ]
  },
  {
    id: 10,
    scene: '时间管理与掌控感',
    title: '以下哪种工作状态，最容易让你产生由衷的“搞钱幸福感”？',
    context: '真正滋养你的是成就感、掌控感还是连接感？',
    options: [
      {
        id: '10A',
        text: '完全不需要我盯梢，我搭建的一套自动化流程或模版在半夜自动进账几十笔订单',
        subtext: '自动化系统与被动收益',
        scores: { execution: 2, product: 2 }
      },
      {
        id: '10B',
        text: '花了一下午写出的深度走心干货笔记，收到上百条“作者太懂我了，看哭了”的长评论',
        subtext: '灵魂共鸣与高情绪回馈',
        scores: { emotion: 3, traffic: 1 }
      },
      {
        id: '10C',
        text: '在两个大佬之间巧妙沟通几句，促成了一单大合作，我既不需要出苦力又拿了体面佣金',
        subtext: '以小博大与杠杆博弈',
        scores: { resource: 3, insight: 1 }
      },
      {
        id: '10D',
        text: '我独立策划、设计、包装的一款全新服务上线，因为概念太新颖，成为行业模仿标杆',
        subtext: '开创认知与品味领先',
        scores: { product: 3, insight: 1 }
      }
    ]
  },
  {
    id: 11,
    scene: '知识变现逻辑',
    title: '如果要为你过去几年积累的所有技能和经验定个价，你认为它最值钱的形态是？',
    context: '如何将无形的阅历转化为具象的货币？',
    options: [
      {
        id: '11A',
        text: '极具美感与设计感的精美全套图卡 / 灵感工具库，买到就是审美享受',
        subtext: '高审美视觉资产',
        scores: { product: 3, emotion: 1 }
      },
      {
        id: '11B',
        text: '一份能帮别人避开 90% 弯路、拿来就能直接套用的傻瓜式实操清单与避坑指南',
        subtext: '高确定性执行方案',
        scores: { execution: 3, insight: 1 }
      },
      {
        id: '11C',
        text: '带着我个人强烈人设、充满陪伴感与治愈能量的私密高客单交流席位',
        subtext: '独家情感磁场溢价',
        scores: { emotion: 3, resource: 1 }
      },
      {
        id: '11D',
        text: '普通人根本接触不到的行业内幕名单、资源对接群与隐蔽渠道入口',
        subtext: '稀缺资源圈层准入',
        scores: { resource: 3, insight: 1 }
      }
    ]
  },
  {
    id: 12,
    scene: '利益分配与格局',
    title: '与合作伙伴共同完成了一个盈利远超预期的副业项目，关于分钱你的态度是？',
    context: '利益分配的格局，往往决定了一个人商业版图的终极天花板。',
    options: [
      {
        id: '12A',
        text: '主动让利给合作方，甚至给关键引流/渠道伙伴超额红包，把关系盘活为长期提款机',
        subtext: '放长线钓大鱼的资源谋略',
        scores: { resource: 3, emotion: 1 }
      },
      {
        id: '12B',
        text: '将多赚的利润拿出一部分用于升级品牌视觉与视觉包装，为下次提高客单价铺路',
        subtext: '持续投入品牌美学溢价',
        scores: { product: 3, execution: 1 }
      },
      {
        id: '12C',
        text: '用这笔钱立刻招募兼职或采购自动化生产工具，将这套流程彻底固化成甩手掌柜模型',
        subtext: '资本再投资与规模复制',
        scores: { execution: 3, resource: 1 }
      },
      {
        id: '12D',
        text: '把这次操盘写成复盘笔记在社交媒体公开发布，借这场大捷把个人影响力打响十倍',
        subtext: '商业战绩公关化与流量造势',
        scores: { traffic: 3, insight: 1 }
      }
    ]
  },
  {
    id: 13,
    scene: '商业直觉与防坑',
    title: '市面上某个加盟项目号称“0门槛、3天回本、月入过万”，你最敏锐的识破点是？',
    context: '在充满诱惑的赚钱故事面前，你的第一道防火墙是什么？',
    options: [
      {
        id: '13A',
        text: '“如果这么赚钱他们为什么不自己闷声发财，反而花大价钱投流找下线？”',
        subtext: '一眼洞穿商业底层悖论',
        scores: { insight: 3, traffic: 1 }
      },
      {
        id: '13B',
        text: '“这种模式没有任何核心资产积累，一旦平台规则改变，瞬间归零”',
        subtext: '洞察系统脆弱性与护城河',
        scores: { product: 2, resource: 2 }
      },
      {
        id: '13C',
        text: '“算算他们的履约成本和退款率，纯靠割韭菜情绪驱动，根本无法形成正向复购”',
        subtext: '看重长期客户信任与声誉',
        scores: { emotion: 3, execution: 1 }
      },
      {
        id: '13D',
        text: '“所谓的保姆级交付根本经不起推敲，新人没有成熟供应链支撑完全落不了地”',
        subtext: '关注实操交付闭环的断点',
        scores: { execution: 3, resource: 1 }
      }
    ]
  },
  {
    id: 14,
    scene: '内容传播本能',
    title: '如果你要向别人安利一本你近期最爱的冷门好书，你会怎么做？',
    context: '安利好物的方式，就是你未来卖货变现的镜像映射。',
    options: [
      {
        id: '14A',
        text: '提炼出书里最刺痛人心的反直觉金句，配上沉浸式阅读封面，让人忍不住收藏点赞',
        subtext: '金句提炼与爆款网感',
        scores: { traffic: 3, emotion: 1 }
      },
      {
        id: '14B',
        text: '把全书核心模型画成一张极度精致清晰的思维脑图，并在小红书附带高清原图领取',
        subtext: '视觉化降维与高价值交付',
        scores: { product: 3, execution: 1 }
      },
      {
        id: '14C',
        text: '结合自己读完这本书后如何走出一场人生低谷的亲身经历，写一封走心的公开信',
        subtext: '真诚叙事与灵魂共鸣',
        scores: { emotion: 3, product: 1 }
      },
      {
        id: '14D',
        text: '梳理这本书解决的具体职业卡点，联络几位书荒的职场朋友做一次读书会闭门变现',
        subtext: '圈层撮合与闭门变现',
        scores: { resource: 3, insight: 1 }
      }
    ]
  },
  {
    id: 15,
    scene: '商业概念重构',
    title: '“下班后摆摊卖烤肠”在普通人眼里是苦力活，如果要升维成为高利润小生意，你会？',
    context: '概念的力量，能让平凡之物焕发神圣的光芒。',
    options: [
      {
        id: '15A',
        text: '改名为“打工人解压香肠实验室”，烤肠搭配情绪微醺特调，打造露营风打卡摊位',
        subtext: '情绪概念化与场景升维',
        scores: { product: 3, emotion: 1 }
      },
      {
        id: '15B',
        text: '录制《美女下班兼职摆摊记》系列小红书日更日记，摊位没赚多少，短视频接商单狂赚十倍',
        subtext: '内容反哺实业与流量倍增',
        scores: { traffic: 3, insight: 1 }
      },
      {
        id: '15C',
        text: '自己不出摊，把烤肠原料、设备、话术打包成整套“大学生轻创业摆摊盒子”卖加盟供应链',
        subtext: '后端赋能与供应链杠杆',
        scores: { resource: 3, execution: 1 }
      },
      {
        id: '15D',
        text: '精细化计算出摊位置人流量分布与出餐秒速，制定最佳路线与备货模型，做到极致坪效',
        subtext: '运营精细化与坪效极致',
        scores: { execution: 3, insight: 1 }
      }
    ]
  },
  {
    id: 16,
    scene: '终极商业愿景',
    title: '设想 3 年后你的商业与搞钱状态，最令你热血沸腾的场景是？',
    context: '心之所向，就是你天赋与体质的最终绽放之地。',
    options: [
      {
        id: '16A',
        text: '成为一个低调的隐形推手，链接着各行各业的精英，在幕后轻松调动数百万资金流动',
        subtext: '幕后掌控与资源自由',
        scores: { resource: 3, insight: 1 }
      },
      {
        id: '16B',
        text: '拥有一个极具审美品味的独立品牌，哪怕价格昂贵，也有一群忠实拥趸疯狂追随',
        subtext: '美学崇拜与溢价自由',
        scores: { product: 3, emotion: 1 }
      },
      {
        id: '16C',
        text: '一台笔记本全球旅居，依靠自己打造的数字化产品矩阵，实现真正的地理与时间自由',
        subtext: '超级个体与闭环自由',
        scores: { execution: 2, product: 2 }
      },
      {
        id: '16D',
        text: '在某个细分领域拥有呼风唤雨的影响力，一言一行都能引领潮流并引来全网追捧',
        subtext: '流量巅峰与呼风唤雨',
        scores: { traffic: 3, emotion: 1 }
      }
    ]
  },
  {
    id: 17,
    scene: 'AI生产力浪潮',
    title: '面对席卷而来的 AI 与大模型新技术浪潮，你的第一本能动作是？',
    context: '面对革命性生产力升级，你最擅长用什么姿势将其转化为变现杠杆？',
    options: [
      {
        id: '17A',
        text: '第一时间测试出好玩的生图或文案效果，发小红书做《小白必看的AI神仙玩法》狂揽万赞',
        subtext: '公域追热点与情绪爆款',
        scores: { traffic: 3, insight: 1 }
      },
      {
        id: '17B',
        text: '把 AI 产出的一套提示词调优包装成精美的《行业高溢价灵感手册》直接付费发售',
        subtext: '产品化升维与数字资产',
        scores: { product: 3, execution: 1 }
      },
      {
        id: '17C',
        text: '摸清海外最新工具与国内的信息差，用零代码或搬运赚取第一波认知套利红利',
        subtext: '前沿套利与信息差敏锐',
        scores: { insight: 3, resource: 1 }
      },
      {
        id: '17D',
        text: '用 AI 脚本替自己跑通繁琐的日报整理、选品抓取与自动回复，实现个人生产力十倍化',
        subtext: '流程降本与极致自动化',
        scores: { execution: 3, product: 1 }
      }
    ]
  },
  {
    id: 18,
    scene: '公关与抗挫心理',
    title: '你的自媒体笔记小爆后，评论区突然冒出几条恶意抬杠甚至质疑你的评论，你？',
    context: '面对负面评价的应激反应，最能看出你的人性掌控力。',
    options: [
      {
        id: '18A',
        text: '顺水推舟，截图恶评作为新封面，发一篇《被骂上热搜后我的真实思考》，反手再赚一波大流量',
        subtext: '借势造势与黑红逆转',
        scores: { traffic: 3, emotion: 1 }
      },
      {
        id: '18B',
        text: '心平气和地走心回复一条有温度的深度置顶长评，瞬间把看客全部圈粉为铁粉',
        subtext: '情绪掌控与高阶共情',
        scores: { emotion: 3, resource: 1 }
      },
      {
        id: '18C',
        text: '完全不受情绪干扰，立刻在后台设置敏感词黑名单，并把产品介绍文案补充得无懈可击',
        subtext: '规则防风控与交付完善',
        scores: { execution: 3, product: 1 }
      },
      {
        id: '18D',
        text: '私聊圈子里几位互推的博主好友，请大家在评论区互动控场，同时商量接下来的联名计划',
        subtext: '资源互保与圈层借力',
        scores: { resource: 3, insight: 1 }
      }
    ]
  },
  {
    id: 19,
    scene: '私域发圈经营',
    title: '如果要经营一个年入 10 万+ 的高变现个人朋友圈，你的发圈哲学更偏向？',
    context: '私域是距离钱最近的地方，你的表达风格决定了你的成交逻辑。',
    options: [
      {
        id: '19A',
        text: '极其考究的审美日常、高级光影静物图配上金句，塑造令人向往的高净值生活提案',
        subtext: '审美高溢价与生活方式',
        scores: { product: 3, emotion: 1 }
      },
      {
        id: '19B',
        text: '高频分享普通人看不到的行业独家内幕、数据大盘与前沿趋势，塑造无可辩驳的情报高地',
        subtext: '信息差壁垒与行业权威',
        scores: { insight: 3, resource: 1 }
      },
      {
        id: '19C',
        text: '记录与客户的走心聊天截图、自己真实的脆弱与突破，像朋友一样深度陪伴',
        subtext: '真诚人设与深度粘性',
        scores: { emotion: 3, product: 1 }
      },
      {
        id: '19D',
        text: '固定每天早中晚发干货卡片、用户好评见证与标准化购买链接，严格按排期精准执行',
        subtext: 'SOP 标准化运营节奏',
        scores: { execution: 3, traffic: 1 }
      }
    ]
  },
  {
    id: 20,
    scene: '客户谈判博弈',
    title: '意向客户对你的高客单服务很心动，但突然试探：“别家才卖一半价格，你能不能打个折？”',
    context: '捍卫你的商业定价权，你的第一反应往往是你的底气所在。',
    options: [
      {
        id: '20A',
        text: '“我们不打折，但我为您额外赠送一份价值 1299 元的高阶审美定制礼盒”——用高溢价赠品守住价格',
        subtext: '概念包装与溢价防御',
        scores: { product: 3, insight: 1 }
      },
      {
        id: '20B',
        text: '深聊对方砍价背后的真实资金卡点，帮其设计分期或定制更贴合的轻量方案，赢得感激',
        subtext: '走心共情与灵活撮合',
        scores: { emotion: 3, resource: 1 }
      },
      {
        id: '20C',
        text: '一眼看穿对方只是在博弈试探，条分缕析列出竞品由于偷工减料导致的隐性损失，以理服人',
        subtext: '降维对比与商业洞察',
        scores: { insight: 3, execution: 1 }
      },
      {
        id: '20D',
        text: '拿出详尽的交付里程碑表格与承诺书：“一分钱一分货，我们承诺每一步都有验收标准”',
        subtext: '硬核交付与契约精神',
        scores: { execution: 3, resource: 1 }
      }
    ]
  },
  {
    id: 21,
    scene: '能量低谷破局',
    title: '白天职场被掏空、身心俱疲但晚上又必须推进副业时，哪种方式最能让你“无痛搞钱”？',
    context: '在低能量周期，最不消耗你意志力的动作，就是你的核心天赋天赋区。',
    options: [
      {
        id: '21A',
        text: '瘫在沙发上刷对标同行的爆款笔记，边看边随手记下 10 个灵感选题与吸睛标题',
        subtext: '灵感捕捉与网感充电',
        scores: { traffic: 3, product: 1 }
      },
      {
        id: '21B',
        text: '听着舒缓音乐，打开排版软件修几张极度治愈的美图，沉浸在纯粹的审美心流中',
        subtext: '视觉沉浸与美学自愈',
        scores: { product: 3, emotion: 1 }
      },
      {
        id: '21C',
        text: '给合作方发几条语音盘一盘本周进度，把琐碎任务分配给兼职，自己负责把控全局',
        subtext: '借力调配与杠杆放手',
        scores: { resource: 3, execution: 1 }
      },
      {
        id: '21D',
        text: '关掉所有群聊，戴上耳机专注把一个自动化表格填完，看着井井有条的清单倍感解压',
        subtext: '秩序整理与单点突破',
        scores: { execution: 3, insight: 1 }
      }
    ]
  },
  {
    id: 22,
    scene: '商业展会选品',
    title: '去参加一场全国新消费生活方式博览会，穿梭在数百个展位间，你最敏锐的直觉是？',
    context: '置身于琳琅满目的商业海洋，你的商业过滤器会过滤出什么？',
    options: [
      {
        id: '22A',
        text: '敏锐发现某几个展位的视觉陈列极具小红书网感，立刻嗅到下个季度的爆款风格风向',
        subtext: '审美风向与爆品直觉',
        scores: { product: 2, traffic: 2 }
      },
      {
        id: '22B',
        text: '专门找藏在角落里的源头代工厂老板加微信，拿到出厂成本底价，盘算国内零售差价',
        subtext: '一手底牌与信息差套利',
        scores: { insight: 3, resource: 1 }
      },
      {
        id: '22C',
        text: '快速拉拢 5 位同样来逛展的头部买手博主建群，商量一起抱团向品牌方拿全网最低团购价',
        subtext: '圈层联盟与集采议价',
        scores: { resource: 3, emotion: 1 }
      },
      {
        id: '22D',
        text: '重点考察各厂家的发货履约能力、退换货质保与代发流程，寻找交付最稳健的靠谱供货方',
        subtext: '供应链闭环与稳健交付',
        scores: { execution: 3, insight: 1 }
      }
    ]
  }
]
