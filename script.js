// 页面滚动到指定区域
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// 打开工具面板
function openTool(toolName) {
    const modal = document.getElementById('toolModal');
    const modalBody = document.getElementById('modalBody');
    
    const toolTemplates = {
        script: {
            title: '📝 AI脚本生成',
            content: `
                <h2>AI脚本生成器</h2>
                <p>输入关键词，AI为您生成专业级短视频脚本</p>
                <div class="input-group" style="margin: 20px 0;">
                    <input type="text" placeholder="输入关键词或热点话题" class="input-large" id="scriptKeyword">
                </div>
                <div class="input-group" style="margin: 15px 0;">
                    <select class="input-large" id="scriptStyle">
                        <option>选择视频风格</option>
                        <option>励志鸡汤</option>
                        <option>搞笑段子</option>
                        <option>知识科普</option>
                        <option>生活技巧</option>
                        <option>故事叙述</option>
                    </select>
                </div>
                <div class="input-group" style="margin: 15px 0;">
                    <input type="number" placeholder="视频时长（秒）" class="input-large" id="scriptDuration" value="30">
                </div>
                <button class="btn btn-primary" onclick="generateScript()" style="width: 100%;">生成脚本</button>
                <div id="scriptResult" style="margin-top: 20px;"></div>
            `
        },
        title: {
            title: '✨ 爆款标题生成',
            content: `
                <h2>爆款标题生成器</h2>
                <p>让AI为您的视频创造5个高点击率标题</p>
                <div class="input-group" style="margin: 20px 0;">
                    <textarea class="input-large" placeholder="输入视频内容描述或脚本..." style="height: 120px;" id="titleContent"></textarea>
                </div>
                <div class="input-group" style="margin: 15px 0;">
                    <select class="input-large" id="platform">
                        <option>选择目标平台</option>
                        <option>抖音</option>
                        <option>快手</option>
                        <option>小红书</option>
                        <option>YouTube</option>
                        <option>B站</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="generateTitle()" style="width: 100%;">生成标题</button>
                <div id="titleResult" style="margin-top: 20px;"></div>
            `
        },
        copywriting: {
            title: '💬 营销文案生成',
            content: `
                <h2>营销文案生成器</h2>
                <p>生成吸引人的视频描述和营销文案</p>
                <div class="input-group" style="margin: 20px 0;">
                    <textarea class="input-large" placeholder="输入视频标题和内容..." style="height: 120px;" id="copyContent"></textarea>
                </div>
                <div class="input-group" style="margin: 15px 0;">
                    <select class="input-large" id="copyStyle">
                        <option>选择文案风格</option>
                        <option>引人入胜型</option>
                        <option>知识科普型</option>
                        <option>幽默搞笑型</option>
                        <option>专业严谨型</option>
                        <option>感情煽动型</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="generateCopywriting()" style="width: 100%;">生成文案</button>
                <div id="copyResult" style="margin-top: 20px;"></div>
            `
        },
        teleprompter: {
            title: '🎤 智能提词器',
            content: `
                <h2>智能提词器</h2>
                <p>专业级提词工具，支持多种演讲场景</p>
                <div class="input-group" style="margin: 20px 0;">
                    <textarea class="input-large" placeholder="粘贴您的脚本文本..." style="height: 150px;" id="telepromptText"></textarea>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                    <div>
                        <label>字体大小</label>
                        <input type="range" min="12" max="48" value="24" id="fontSize" style="width: 100%;">
                    </div>
                    <div>
                        <label>滚动速度</label>
                        <select class="input-large" id="scrollSpeed">
                            <option value="slow">慢速</option>
                            <option value="normal" selected>正常</option>
                            <option value="fast">快速</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="launchTeleprompter()" style="width: 100%;">打开提词器</button>
            `
        },
        storyboard: {
            title: '🎞️ 分镜头脚本',
            content: `
                <h2>分镜头脚本生成</h2>
                <p>将文字脚本转化为详细的分镜头设计</p>
                <div class="input-group" style="margin: 20px 0;">
                    <textarea class="input-large" placeholder="输入或粘贴您的脚本..." style="height: 150px;" id="storyboardScript"></textarea>
                </div>
                <button class="btn btn-primary" onclick="generateStoryboard()" style="width: 100%;">生成分镜</button>
                <div id="storyboardResult" style="margin-top: 20px;"></div>
            `
        },
        analysis: {
            title: '🔍 爆款视频拆解',
            content: `
                <h2>爆款视频拆解工具</h2>
                <p>分析爆款视频的结构、文案、音乐、特效</p>
                <div class="input-group" style="margin: 20px 0;">
                    <input type="text" placeholder="输入视频链接或ID" class="input-large" id="videoUrl">
                </div>
                <button class="btn btn-primary" onclick="analyzeVideo()" style="width: 100%;">开始拆解</button>
                <div id="analysisResult" style="margin-top: 20px;"></div>
            `
        },
        music: {
            title: '🎵 AI音乐推荐',
            content: `
                <h2>AI音乐推荐库</h2>
                <p>根据视频风格推荐最匹配的背景音乐</p>
                <div class="input-group" style="margin: 20px 0;">
                    <select class="input-large" id="videoMood">
                        <option>选择视频气氛</option>
                        <option>欢快活泼</option>
                        <option>温暖感人</option>
                        <option>紧张刺激</option>
                        <option>神秘幽暗</option>
                        <option>舒缓放松</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="recommendMusic()" style="width: 100%;">推荐音乐</button>
                <div id="musicResult" style="margin-top: 20px;"></div>
            `
        },
        voiceover: {
            title: '🔊 配音管理',
            content: `
                <h2>智能配音管理</h2>
                <p>多种配音方式：文本转语音、数字人配音</p>
                <div class="input-group" style="margin: 20px 0;">
                    <textarea class="input-large" placeholder="输入需要配音的文本..." style="height: 120px;" id="voiceoverText"></textarea>
                </div>
                <div class="input-group" style="margin: 15px 0;">
                    <select class="input-large" id="voiceType">
                        <option>选择配音方式</option>
                        <option>女性主播（温和）</option>
                        <option>女性主播（激情）</option>
                        <option>男性主播（沉稳）</option>
                        <option>男性主播（热血）</option>
                        <option>童谣风格</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="generateVoiceover()" style="width: 100%;">生成配音</button>
            `
        },
        effects: {
            title: '✨ 特效素材库',
            content: `
                <h2>特效素材库</h2>
                <p>海量转场、字幕、贴纸特效库</p>
                <div style="margin: 20px 0;">
                    <div style="margin-bottom: 15px;">
                        <button class="btn btn-small" style="margin-right: 10px;">✨ 转场特效</button>
                        <button class="btn btn-small" style="margin-right: 10px;">📝 字幕样式</button>
                        <button class="btn btn-small" style="margin-right: 10px;">🎀 贴纸效果</button>
                    </div>
                </div>
                <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center;">
                    <p>转场特效 x 50+</p>
                    <p>字幕样式 x 100+</p>
                    <p>贴纸效果 x 200+</p>
                </div>
            `
        },
        'digital-avatar': {
            title: '🤖 数字人视频生成',
            content: `
                <h2>数字人视频生成</h2>
                <p>选择数字人形象，生成虚拟主播视频</p>
                <div class="input-group" style="margin: 20px 0;">
                    <label>选择数字人：</label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
                        <div style="padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; text-align: center; cursor: pointer;" onclick="selectAvatar(this)">
                            <div style="font-size: 40px; margin-bottom: 10px;">👩</div>
                            <p>妍妍（女性）</p>
                        </div>
                        <div style="padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; text-align: center; cursor: pointer;" onclick="selectAvatar(this)">
                            <div style="font-size: 40px; margin-bottom: 10px;">👨</div>
                            <p>浩宇（男性）</p>
                        </div>
                    </div>
                </div>
                <div class="input-group" style="margin: 15px 0;">
                    <textarea class="input-large" placeholder="输入脚本文本..." style="height: 100px;" id="avatarScript"></textarea>
                </div>
                <button class="btn btn-primary" onclick="generateAvatar()" style="width: 100%;">生成视频</button>
            `
        },
        'video-generation': {
            title: '🎬 智能粗剪视频',
            content: `
                <h2>智能粗剪视频</h2>
                <p>基于脚本和素材，AI自动合成视频</p>
                <div class="input-group" style="margin: 20px 0;">
                    <textarea class="input-large" placeholder="输入或粘贴脚本..." style="height: 120px;" id="cutScript"></textarea>
                </div>
                <div class="input-group" style="margin: 15px 0;">
                    <select class="input-large" id="outputFormat">
                        <option>选择输出格式</option>
                        <option>MP4 (1080P)</option>
                        <option>MP4 (720P)</option>
                        <option>MOV</option>
                        <option>WebM</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="generateRoughCut()" style="width: 100%;">开始生成</button>
                <div id="cutResult" style="margin-top: 20px;"></div>
            `
        },
        'text-to-video': {
            title: '🎥 文生视频',
            content: `
                <h2>文生视频转换</h2>
                <p>从文字脚本直接生成高质量视频</p>
                <div class="input-group" style="margin: 20px 0;">
                    <textarea class="input-large" placeholder="输入详细的场景描述文本..." style="height: 150px;" id="textForVideo"></textarea>
                </div>
                <div class="input-group" style="margin: 15px 0;">
                    <select class="input-large" id="artStyle">
                        <option>选择艺术风格</option>
                        <option>写实风格</option>
                        <option>动画风格</option>
                        <option>卡通风格</option>
                        <option>油画风格</option>
                        <option>科幻风格</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="generateTextToVideo()" style="width: 100%;">生成视频</button>
                <div id="textToVideoResult" style="margin-top: 20px;"></div>
            `
        },
        'video-enhancement': {
            title: '🎨 视频增强与优化',
            content: `
                <h2>视频增强工具</h2>
                <p>AI自动优化视频质量、色彩、音频</p>
                <div class="input-group" style="margin: 20px 0;">
                    <input type="file" class="input-large" id="uploadVideo" accept="video/*">
                </div>
                <div style="margin: 15px 0;">
                    <label>
                        <input type="checkbox" checked> 色彩分级
                    </label><br>
                    <label style="margin-top: 10px; display: block;">
                        <input type="checkbox" checked> 音频降噪
                    </label><br>
                    <label style="margin-top: 10px; display: block;">
                        <input type="checkbox" checked> 画面清晰度提升
                    </label>
                </div>
                <button class="btn btn-primary" onclick="enhanceVideo()" style="width: 100%;">开始增强</button>
                <div id="enhanceResult" style="margin-top: 20px;"></div>
            `
        }
    };

    const tool = toolTemplates[toolName];
    if (tool) {
        modalBody.innerHTML = tool.content;
        modal.style.display = 'flex';
    }
}

// 关闭模态框
function closeModal() {
    document.getElementById('toolModal').style.display = 'none';
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('toolModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// 演示页面点击按钮
function openDemo() {
    alert('演示已准备就绪！请使用下方的快速演示工具。');
    scrollToSection('core');
}

// 生成核心内容（脚本、标题、文案）
function generateCore() {
    const keyword = document.getElementById('keywordInput').value.trim();
    if (!keyword) {
        alert('请输入关键词或热点话题');
        return;
    }

    // 模拟生成内容
    const mockScript = `【${keyword}的故事】\n\n00:00 - 引入话题\n一开始，我们要说的是关于"${keyword}"的一个有趣现象。\n\n00:05 - 展开情节\n你有没有想过，为什么${keyword}这么重要？\n\n00:15 - 高潮部分\n这就是答案：它改变了我们的日常生活！\n\n00:25 - 结尾总结\n所以，${keyword}的意义远超我们的想象。`;

    const mockTitles = [
        `【震撼】${keyword}的真相竟然是这样！`,
        `万万没想到！${keyword}居然有这个功能`,
        `${keyword}火了！专家告诉你为什么`,
        `这才是${keyword}的正确打开方式`,
        `${keyword}：一场改变生活的革命`
    ];

    const mockCopywriting = `✨ ${keyword}的秘密就在这里！\n\n你是否也在好奇${keyword}究竟有什么魅力？今天我们就为你揭秘！\n\n💡 这个视频将为你带来：\n• 深度分析和专业解读\n• 实用技巧和生活建议\n• 新鲜观点和创新思考\n\n🎯 别错过！点赞、评论、分享，让更多人了解${keyword}！\n\n#${keyword} #涨知识 #必看`;

    document.getElementById('scriptOutput').textContent = mockScript;
    document.getElementById('titleOutput').textContent = mockTitles.join('\n\n');
    document.getElementById('copywritingOutput').textContent = mockCopywriting;
    document.getElementById('coreOutput').style.display = 'block';
}

// 生成脚本
function generateScript() {
    const keyword = document.getElementById('scriptKeyword').value;
    const style = document.getElementById('scriptStyle').value;
    const duration = document.getElementById('scriptDuration').value;

    if (!keyword) {
        alert('请输入关键词');
        return;
    }

    const result = `✅ 已为您生成 ${duration}秒 ${style} 脚本\n\n【脚本标题】${keyword}\n【视频时长】${duration}秒\n【风格类型】${style}\n\n【脚本内容】\n00:00-00:05 开场白\n你好，欢迎收看今天的内容！今天要和大家分享的是关于"${keyword}"的故事。\n\n00:05-00:${Math.min(duration-5, 20)} 主要内容\n${style}的特点就是能够吸引观众的注意力。通过${keyword}这个话题，我们可以看到...\n\n00:${Math.min(duration-5, 20)}-${duration}秒 结尾\n感谢大家的观看，记得点赞、评论、关注！`;

    document.getElementById('scriptResult').innerHTML = `<div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1;"><pre>${result}</pre></div>`;
}

// 生成标题
function generateTitle() {
    const content = document.getElementById('titleContent').value;
    const platform = document.getElementById('platform').value;

    if (!content) {
        alert('请输入视频内容描述');
        return;
    }

    const titles = [
        `⚡这个方法${platform}上火爆了！`,
        `🔥${platform}最近最火的秘诀竟然是...`,
        `💥万万没想到！${content.substring(0, 10)}这样就够了`,
        `✨${platform}博主都在用这招`,
        `🚀一个视频获赞100万+的原因`
    ];

    const resultHTML = titles.map(title => `<div style="padding: 10px; background: #f0f9ff; margin-bottom: 10px; border-radius: 6px; border-left: 3px solid #6366f1;">📌 ${title}</div>`).join('');
    document.getElementById('titleResult').innerHTML = resultHTML;
}

// 生成文案
function generateCopywriting() {
    const content = document.getElementById('copyContent').value;
    const style = document.getElementById('copyStyle').value;

    if (!content) {
        alert('请输入内容');
        return;
    }

    const copy = `✨ ${style}文案示例\n\n${content.substring(0, 20)}的秘诀就在这个视频里！\n\n👇 这个视频将改变你的认知：\n• 专业解读\n• 实用技巧  \n• 生活建议\n\n💬 评论区见！\n\n#涨知识 #必看 #分享`;

    document.getElementById('copyResult').innerHTML = `<div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1;"><pre>${copy}</pre></div>`;
}

// 其他生成函数（简化示例）
function generateStoryboard() {
    const script = document.getElementById('storyboardScript').value;
    if (!script) {
        alert('请输入脚本');
        return;
    }
    alert('📹 分镜脚本已生成！\n\n第1镜：开场镜头\n第2镜：主体展示\n第3镜：细节特写\n第4镜：高潮部分\n第5镜：结尾总结\n\n✅ 已自动生成30+ 分镜提案');
}

function analyzeVideo() {
    const url = document.getElementById('videoUrl').value;
    if (!url) {
        alert('请输入视频链接');
        return;
    }
    alert('🔍 视频分析中...\n\n✅ 拆解完成！\n• 视频结构：开场(5s) + 主体(20s) + 结尾(5s)\n• 文案风格：故事+教程混合\n• 使用音乐：节奏感强的现代音乐\n• 特效应用：3次转场+5个字幕\n• 色彩风格：蓝色+黄色主题');
}

function recommendMusic() {
    const mood = document.getElementById('videoMood').value;
    if (!mood) {
        alert('请选择视频气氛');
        return;
    }
    alert(`🎵 为"${mood}"推荐的音乐：\n\n1. 《轻快序曲》- 适合开场\n2. 《梦想之歌》- 适合主体\n3. 《温暖时刻》- 适合结尾\n\n✅ 点击即可预览和使用`);
}

function generateVoiceover() {
    const text = document.getElementById('voiceoverText').value;
    const type = document.getElementById('voiceType').value;
    if (!text) {
        alert('请输入配音文本');
        return;
    }
    alert(`🔊 正在生成${type}配音...\n\n✅ 配音已生成！\n文本长度：${text.length} 字\n估计时长：${Math.ceil(text.length / 10)} 秒\n质量：高清音频\n\n📥 立即下载 | 🎧 试听`);
}

function selectAvatar(element) {
    document.querySelectorAll('[onclick="selectAvatar(this)"]').forEach(el => {
        el.style.borderColor = '#e0e0e0';
    });
    element.style.borderColor = '#6366f1';
    element.style.borderWidth = '3px';
}

function generateAvatar() {
    const script = document.getElementById('avatarScript').value;
    if (!script) {
        alert('请输入脚本');
        return;
    }
    alert(`🤖 正在生成数字人视频...\n\n⏱️ 预计时间：3-5分钟\n📊 视频信息：\n• 分辨率：1080P\n• 帧率：30fps\n• 时长：${Math.ceil(script.length / 15)} 秒\n\n✅ 生成完成后将自动下载`);
}

function generateRoughCut() {
    const script = document.getElementById('cutScript').value;
    const format = document.getElementById('outputFormat').value;
    if (!script || format === '选择输出格式') {
        alert('请输入脚本并选择输出格式');
        return;
    }
    alert(`🎬 正在生成粗剪视频...\n\n📋 视频规格：\n• 格式：${format}\n• 脚本长度：${script.length} 字\n• 自动配置：字幕 + 音乐 + 转场\n\n✅ 预计5分钟内完成生成`);
}

function generateTextToVideo() {
    const text = document.getElementById('textForVideo').value;
    const style = document.getElementById('artStyle').value;
    if (!text || style === '选择艺术风格') {
        alert('请输入文本并选择艺术风格');
        return;
    }
    alert(`🎥 文生视频生成中...\n\n🎨 参数设置：\n• 艺术风格：${style}\n• 文本长度：${text.length} 字\n• 分辨率：1080P\n\n⏳ 处理中... 预计10-15分钟完成`);
}

function enhanceVideo() {
    alert('🎨 视频增强中...\n\n✅ 正在应用以下优化：\n✓ 色彩分级\n✓ 音频降噪  \n✓ 画面清晰度提升\n\n预计处理时间取决于视频长度\n🎬 处理完成后将通知您');
}

function launchTeleprompter() {
    const text = document.getElementById('telepromptText').value;
    if (!text) {
        alert('请输入脚本文本');
        return;
    }
    alert('🎤 提词器已打开！\n\n功能：\n✓ 滚动显示\n✓ 字体调整\n✓ 速度控制\n✓ 全屏模式\n\n👁️ 按空格键开始/暂停滚动');
}
