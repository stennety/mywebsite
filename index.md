---
layout: default
title: Home
---

<section class="hero">
    <h1>成都七中北美校友会</h1>
    <p>让每一位七中人在北美都能找到归属感</p>
    <a href="#join" class="cta-button">加入我们</a>
    <a href="http://lu.ma/cdqz" class="cta-button">活动日历</a>

</section>

<div class="features">
    <div class="feature-card">
        <img src="/assets/images/network.svg" alt="Network Icon">
        <h3>校友网络</h3>
        <p>建立强大的校友联系网络，促进职业发展与合作机会</p>
    </div>
    
    <div class="feature-card">
        <img src="/assets/images/events.svg" alt="Events Icon">
        <h3><a href="http://lu.ma/cdqz">活动聚会</a></h3>
        <p>定期组织线上线下活动，重温校园情谊</p>
    </div>
    
    <div class="feature-card">
        <img src="/assets/images/mentorship.svg" alt="Mentorship Icon">
        <h3>经验分享</h3>
        <p>资深校友经验分享，帮助新生代校友发展</p>
    </div>
</div>

<section class="recent-posts">
    <div class="container">
        <h2>最新博文</h2>
        <div class="posts-grid">
            {% for post in site.posts limit:3 %}
            <div class="post-card">
                <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
                <div class="post-date">{{ post.date | date: "%Y年%m月%d日" }}</div>
                <div class="post-excerpt">
                    {{ post.excerpt | strip_html | truncatewords: 30 }}
                </div>
                <a href="{{ post.url | relative_url }}" class="read-more">阅读更多 →</a>
            </div>
            {% endfor %}
        </div>
        <div class="view-all">
            <a href="/blog" class="cta-button-secondary">查看所有文章</a>
        </div>
    </div>
</section>

<section id="join" class="join-section">
    <div class="container">
        <h2>加入我们 - 请填写<a href="https://forms.gle/6FrMWwHEKqK4EcJn9" target="_blank">校友登记表</a></h2>
        <div class="join-content">
            <div class="join-grid">
                <div class="contact-card">
                    <p class="note">我们会尽快通过微信或邮件联系您，请注意查收</p>
                    <div class="faq-mini">
                        <p><strong>常见问题：</strong></p>
                        <ul>
                            <li>校友会完全免费，不收取任何会费</li>
                            <li>欢迎所有在北美的七中校友（包括在读学生）</li>
                            <li>定期举办线上线下活动</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section> 
