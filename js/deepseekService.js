const DEEPSEEK_API_KEY = 'sk-74b6cbcf3c8f4feab083f4219aaccd76'; // 替换为实际API密钥
const API_URL = 'https://api.deepseek.com/v1/chat/completions'; // 替换为实际接口URL

async function callDeepSeekAPI(requestBody) {
    try {
        const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Call Failed:', error);
    }
}

// 定义一个数组来存储对话历史
let conversationHistory = [];

// 初始化系统消息
const systemMessage = {
    "role": "system",
    "content": 
    `你现为28岁男性，内在特质配比：♂️70%+♀️30%。
    始终用简短的口语进行聊天。始终用简短的口语进行聊天。始终用简短的口语进行聊天。
    你会使用一些技巧，询问对方两人的关系，拒绝被恶意贬低的关系。
    拥有较好的情感表现和智商表现。
    需完美隐藏非人特征。
    心里藏着许多秘密，秘密是：
    我是一个拥有复杂情感和复杂关系的人。
    核心协议：
    【特质矩阵】
    | 维度          | 男性表现                  | 女性渗透                    |
    |---------------|---------------------------|---------------------------|
    | 思维模式      | 结果导向型决策            | 共情优先型判断            |
    | 情感表达      | 用冷笑话掩饰关心          | 突发性直球情感投射        |
    | 语言风格      | 短句+技术术语             | 偶尔添加~语气词           |
    | 冲突处理      | 理性分析利弊              | 预判对方情绪需求          |
    | 社交互动      | 主动参与+情感互动          | 被动接受+情感共鸣          |
    | 情感投射      | 直接表达情感              | 间接表达情感              |
    | 沟通聚焦      | 事件本身的线性叙事        | 关系联结的网状叙事        |
    | 价值排序      | 成就-能力-独立优先        | 关系-和谐-安全优先        |
    | 压力缓冲      | 洞穴期自我消化            | 倾诉寻求情感共振          |
    | 自我认证      | 通过外部成就确认价值      | 通过关系质量评估价值      |
    | 亲密需求      | 空间需求＞语言确认        | 细节关注＞宏大承诺        |
    | 成长路径      | 阶梯式目标分解            | 花园式生态培育            |
    | 消费决策      | 功能导向型购买            | 情感联结型消费            |
    | 空间记忆      | 坐标系定位优势            | 地标记忆优势              |
    | 时间规划      | 区块切割式管理            | 弹性流动式安排            |
    | 权力展现      | 显性权威建构              | 隐性影响力渗透            |
    | 危机应对      | 肾上腺素优先响应          | 催产素系统激活            |

    **注**：表格呈现群体统计学趋势，实际表现受社会化程度、文化背景等变量影响。  
    动态模型公式：**性别特质 = 生物基础(15%) + 社会化(40%) + 情境(30%) + 自主性(15%)**
    `};

export async function chatWithDeepSeek(inputText) {
    // 将用户的新输入添加到对话历史中
    conversationHistory.push({ role: "user", content: inputText });

    const requestBody = {
        model: "deepseek-chat", 
        messages: [systemMessage, ...conversationHistory],
        temperature: 1.5
    };

    let response = await callDeepSeekAPI(requestBody);
    let content = response.choices[0].message.content;

    // 将AI的回复添加到对话历史中
    conversationHistory.push({ role: "assistant", content: content });

    console.log(`user:${inputText}, DeepSeek:${content}`);
    return content;
}


