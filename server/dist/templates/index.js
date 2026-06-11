"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleTemplate = exports.creativeTemplate = exports.professionalTemplate = exports.modernTemplate = void 0;
const ICONS = {
    mail: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    phone: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    pin: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    github: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
    linkedin: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
    link: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`
};
const BASE_CSS = `
    *, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }
    html { line-height: 1.5; -webkit-text-size-adjust: 100%; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; }
    body { margin: 0; line-height: inherit; }
    h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; margin: 0; }
    a { color: inherit; text-decoration: inherit; }
    p { margin: 0; }
    .page { width: 100%; min-height: 297mm; background: #fff; position: relative; }
    @media print { .page { page-break-after: always; } }
`;
const modernTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        ${BASE_CSS}
        body { font-family: 'Inter', sans-serif; color: #0f172a; font-size: 10px; }
        .p-8 { padding: 2rem; }
        .header { margin-bottom: 1.5rem; text-align: left; }
        .name { font-size: 1.875rem; font-weight: 900; text-transform: uppercase; letter-spacing: -0.05em; color: #0f172a; margin-bottom: 0.25rem; line-height: 1; }
        .job-title { font-size: 0.75rem; color: #2563eb; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 1rem; }
        .contact { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 9px; font-weight: 700; color: #64748b; }
        .contact div { display: flex; align-items: center; gap: 0.375rem; }
        .icon-blue { color: #3b82f6; display: flex; align-items: center; }
        .section { margin-bottom: 1.5rem; }
        .section-title { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; color: #2563eb; margin-bottom: 0.5rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem; }
        .section-title span { width: 6px; height: 6px; background: #2563eb; display: block; }
        .description { font-size: 10px; line-height: 1.625; color: #475569; font-weight: 500; white-space: pre-wrap; }
        .item { margin-bottom: 1rem; border-left: 2px solid #f1f5f9; padding-left: 0.75rem; position: relative; page-break-inside: avoid; }
        .item::before { content: ""; position: absolute; left: -4.5px; top: 0.375rem; width: 6px; height: 6px; background: #fff; border: 1.5px solid #2563eb; transform: rotate(45deg); }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.125rem; }
        .item-title { font-weight: 700; font-size: 12px; color: #0f172a; }
        .item-date { font-size: 9px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
        .item-sub { font-weight: 700; color: #64748b; font-size: 10px; margin-bottom: 0.375rem; text-transform: uppercase; letter-spacing: 0.1em; }
        .skill-tag { background: #0f172a; color: #fff; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 9px; font-weight: 700; display: inline-block; margin-right: 0.375rem; margin-bottom: 0.375rem; }
        .project-card { background: rgba(248, 250, 252, 0.3); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #f1f5f9; margin-bottom: 1rem; page-break-inside: avoid; width: 100%; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    </style>
</head>
<body>
    <div class="page p-8">
        <header class="header">
            <h1 class="name">${data.personalInfo?.fullName || 'Your Name'}</h1>
            <p class="job-title">${data.personalInfo?.jobTitle || 'Tech Professional'}</p>
            <div class="contact">
                ${data.personalInfo?.email ? `<div><span class="icon-blue">${ICONS.mail}</span> ${data.personalInfo.email}</div>` : ''}
                ${data.personalInfo?.phone ? `<div><span class="icon-blue">${ICONS.phone}</span> ${data.personalInfo.phone}</div>` : ''}
                ${data.personalInfo?.location ? `<div><span class="icon-blue">${ICONS.pin}</span> ${data.personalInfo.location}</div>` : ''}
                ${data.personalInfo?.github ? `<div><span class="icon-blue">${ICONS.github}</span> ${data.personalInfo.github.replace('https://', '')}</div>` : ''}
                ${data.personalInfo?.linkedin ? `<div><span class="icon-blue">${ICONS.linkedin}</span> ${data.personalInfo.linkedin.replace('https://', '')}</div>` : ''}
            </div>
        </header>

        ${data.personalInfo?.summary ? `
        <section class="section">
            <h3 class="section-title"><span></span> Profile Summary</h3>
            <p class="description">${data.personalInfo.summary}</p>
        </section>
        ` : ''}

        ${data.education?.length ? `
        <section class="section">
            <h3 class="section-title"><span></span> Education</h3>
            <div class="grid-2">
                ${data.education.map((edu) => `
                <div style="border-left: 2px solid #f1f5f9; padding-left: 0.75rem; page-break-inside: avoid;">
                    <div style="font-weight: 700; font-size: 11px; text-transform: uppercase;">${edu.school}</div>
                    <div style="font-size: 10px; color: #64748b; font-weight: 700; font-style: italic;">${edu.degree}</div>
                    <div style="font-size: 9px; color: #94a3b8; font-weight: 900;">${edu.graduationDate}</div>
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${data.skills?.length ? `
        <section class="section">
            <h3 class="section-title"><span></span> Technical Stack</h3>
            <div>
                ${data.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </section>
        ` : ''}

        ${data.experience?.length ? `
        <section class="section">
            <h3 class="section-title"><span></span> Work Experience</h3>
            ${data.experience.map((exp) => `
            <div class="item">
                <div class="item-header">
                    <span class="item-title">${exp.position}</span>
                    <span class="item-date">${exp.startDate} — ${exp.endDate}</span>
                </div>
                <div class="item-sub">${exp.company} | ${exp.location}</div>
                <p class="description">${exp.description}</p>
            </div>
            `).join('')}
        </section>
        ` : ''}

        ${data.projects?.length ? `
        <section class="section">
            <h3 class="section-title"><span></span> Featured Projects</h3>
            <div class="grid-2">
                ${data.projects.map((proj) => `
                <div class="project-card">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.25rem;">
                        <div style="font-weight: 700; font-size: 11px; color: #0f172a;">${proj.title}</div>
                        <div style="display: flex; gap: 0.5rem; color: #94a3b8;">
                            ${proj.githubLink ? `<span>${ICONS.github}</span>` : ''}
                            ${proj.deployedLink ? `<span>${ICONS.link}</span>` : ''}
                        </div>
                    </div>
                    <p style="font-size: 9px; color: #64748b; font-style: italic; line-height: 1.5;">${proj.description}</p>
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}
    </div>
</body>
</html>
`;
exports.modernTemplate = modernTemplate;
const professionalTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700;800;900&display=swap');
        ${BASE_CSS}
        body { font-family: 'Inter', sans-serif; color: #1e293b; font-size: 10px; }
        .page { display: flex; }
        .sidebar { width: 30%; background: #1a252f; color: #fff; padding: 1.5rem; flex-shrink: 0; display: flex; flex-direction: column; gap: 1.5rem; }
        .main { width: 70%; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .name { font-family: 'Lora', serif; font-size: 1.25rem; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #334155; padding-bottom: 0.75rem; line-height: 1.25; }
        .job-title { font-size: 8px; color: #94a3b8; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; italic; }
        .sidebar-title { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.25rem; }
        .sidebar-item { font-size: 9px; color: #cbd5e1; margin-bottom: 0.375rem; display: flex; align-items: center; gap: 0.5rem; word-break: break-all; }
        .skill-chip { background: rgba(255,255,255,0.05); padding: 0.125rem 0.375rem; border-radius: 0.125rem; font-size: 8px; font-weight: 700; text-transform: uppercase; display: inline-flex; align-items: center; gap: 0.25rem; margin: 0 0.375rem 0.375rem 0; color: #cbd5e1; }
        .skill-dot { width: 4px; height: 4px; background: #64748b; border-radius: 9999px; }
        .section-title { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; color: #0f172a; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.75rem; }
        .section-line { flex: 1; height: 1px; background: #f1f5f9; }
        .description { font-size: 10px; line-height: 1.625; color: #475569; white-space: pre-wrap; text-align: justify; }
        .item { margin-bottom: 1.5rem; page-break-inside: avoid; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.375rem; }
        .item-title { font-family: 'Lora', serif; font-weight: 700; font-size: 13px; color: #0f172a; font-style: italic; line-height: 1.25; }
        .item-date { font-size: 9px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; }
        .item-sub { font-weight: 700; color: #64748b; font-size: 9px; margin-bottom: 0.375rem; text-transform: uppercase; letter-spacing: 0.1em; }
        .icon { color: #64748b; flex-shrink: 0; }
    </style>
</head>
<body>
    <div class="page">
        <div class="sidebar">
            <div>
                <h1 class="name">${data.personalInfo?.fullName || 'Your Name'}</h1>
                <p class="job-title" style="margin-top: 0.5rem;">${data.personalInfo?.jobTitle || 'Professional Title'}</p>
            </div>
            
            <div>
                <h3 class="sidebar-title">Contact</h3>
                <div style="font-family: 'Inter', sans-serif;">
                    ${data.personalInfo?.email ? `<div class="sidebar-item"><span class="icon">${ICONS.mail}</span> <span>${data.personalInfo.email}</span></div>` : ''}
                    ${data.personalInfo?.phone ? `<div class="sidebar-item"><span class="icon">${ICONS.phone}</span> <span>${data.personalInfo.phone}</span></div>` : ''}
                    ${data.personalInfo?.location ? `<div class="sidebar-item"><span class="icon">${ICONS.pin}</span> <span>${data.personalInfo.location}</span></div>` : ''}
                    ${data.personalInfo?.github ? `<div class="sidebar-item"><span class="icon">${ICONS.github}</span> <span>${data.personalInfo.github.replace('https://', '')}</span></div>` : ''}
                    ${data.personalInfo?.linkedin ? `<div class="sidebar-item"><span class="icon">${ICONS.linkedin}</span> <span>${data.personalInfo.linkedin.replace('https://', '')}</span></div>` : ''}
                </div>
            </div>

            ${data.skills?.length ? `
            <div>
                <h3 class="sidebar-title">Skills</h3>
                <div style="display: flex; flex-wrap: wrap;">
                    ${data.skills.map((skill) => `
                        <div class="skill-chip"><span class="skill-dot"></span> ${skill}</div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
        <div class="main">
            ${data.personalInfo?.summary ? `
            <section style="page-break-inside: avoid;">
                <h2 class="section-title">Profile <span class="section-line"></span></h2>
                <p class="description" style="font-style: italic;">${data.personalInfo.summary}</p>
            </section>
            ` : ''}

            ${data.education?.length ? `
            <section>
                <h2 class="section-title">Education <span class="section-line"></span></h2>
                <div style="display: grid; gap: 0.75rem;">
                    ${data.education.map((edu) => `
                    <div style="display: flex; justify-content: space-between; align-items: start; page-break-inside: avoid;">
                        <div>
                            <div style="font-weight: 700; font-size: 11px; text-transform: uppercase; color: #1e293b;">${edu.school}</div>
                            <div style="font-size: 10px; color: #64748b; font-style: italic; line-height: 1.25;">${edu.degree}</div>
                        </div>
                        <div style="font-size: 9px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">${edu.graduationDate}</div>
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            ${data.experience?.length ? `
            <section>
                <h2 class="section-title">Experience <span class="section-line"></span></h2>
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    ${data.experience.map((exp) => `
                    <div class="item">
                        <div class="item-header">
                            <h3 class="item-title">${exp.position}</h3>
                            <span class="item-date">${exp.startDate} — ${exp.endDate}</span>
                        </div>
                        <div class="item-sub">${exp.company} | ${exp.location}</div>
                        <p class="description">${exp.description}</p>
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            ${data.projects?.length ? `
            <section>
                <h2 class="section-title">Projects <span class="section-line"></span></h2>
                <div style="display: grid; gap: 1rem;">
                    ${data.projects.map((proj) => `
                    <div style="border-left: 2px solid #f1f5f9; padding-left: 0.75rem; page-break-inside: avoid;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                            <h4 style="font-family: 'Lora', serif; font-weight: 700; font-size: 12px; color: #1e293b; font-style: italic;">${proj.title}</h4>
                            ${proj.githubLink ? `<span style="color: #94a3b8;">${ICONS.link}</span>` : ''}
                        </div>
                        <p style="font-size: 9px; color: #64748b; font-style: italic; line-height: 1.5;">${proj.description}</p>
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    </div>
</body>
</html>
`;
exports.professionalTemplate = professionalTemplate;
const creativeTemplate = (data) => {
    const firstName = data.personalInfo?.fullName?.split(' ')[0] || 'FIRST';
    const lastName = data.personalInfo?.fullName?.split(' ').slice(1).join(' ') || 'LAST';
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        ${BASE_CSS}
        body { font-family: 'Inter', sans-serif; color: #0f172a; font-size: 10px; }
        .header { background: #0f172a; color: #fff; padding: 2rem; border-bottom: 4px solid #facc15; display: flex; justify-content: space-between; align-items: center; }
        .name-big { font-size: 1.875rem; font-weight: 900; line-height: 0.85; text-transform: uppercase; letter-spacing: -0.05em; display: flex; flex-direction: column; }
        .accent-text { color: #facc15; }
        .job-tag { background: #facc15; color: #0f172a; display: inline-block; padding: 0.125rem 0.5rem; font-weight: 900; margin-top: 0.75rem; font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; }
        .contact-box { font-size: 9px; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.1em; text-align: right; display: flex; flex-direction: column; gap: 0.375rem; }
        .contact-item { display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; }
        .icon { color: #facc15; }
        .content { padding: 2rem; }
        .h-section { font-size: 1.125rem; font-weight: 900; text-transform: uppercase; margin-bottom: 1rem; border-bottom: 3px solid #facc15; display: inline-block; padding-bottom: 0.125rem; font-style: italic; letter-spacing: -0.02em; }
        .description { font-size: 10px; line-height: 1.625; color: #475569; white-space: pre-wrap; font-weight: 500; }
        .grid-layout { display: grid; grid-template-columns: 1fr 2fr; gap: 2.5rem; margin-top: 2rem; }
        .item-title { font-weight: 900; font-size: 12px; text-transform: uppercase; color: #0f172a; line-height: 1; }
        .item-sub { color: #94a3b8; font-weight: 900; font-size: 9px; text-transform: uppercase; margin: 0.25rem 0; letter-spacing: 0.05em; }
        .item-date { font-size: 8px; font-weight: 900; color: #cbd5e1; text-transform: uppercase; background: #f8fafc; padding: 0.125rem 0.5rem; border-radius: 9999px; }
        .skill-tag { background: #0f172a; color: #fff; padding: 0.25rem 0.5rem; font-size: 8px; font-weight: 900; text-transform: uppercase; border-radius: 0.25rem; display: inline-block; margin: 0 0.25rem 0.25rem 0; letter-spacing: 0.1em; }
    </style>
</head>
<body>
    <div class="page">
        <header class="header">
            <div>
                <h1 class="name-big"><span>${firstName}</span><span class="accent-text">${lastName}</span></h1>
                <div class="job-tag">${data.personalInfo?.jobTitle || 'Creative Force'}</div>
            </div>
            <div class="contact-box">
                ${data.personalInfo?.email ? `<div class="contact-item">${data.personalInfo.email} <span class="icon">${ICONS.mail}</span></div>` : ''}
                ${data.personalInfo?.phone ? `<div class="contact-item">${data.personalInfo.phone} <span class="icon">${ICONS.phone}</span></div>` : ''}
                ${data.personalInfo?.location ? `<div class="contact-item">${data.personalInfo.location} <span class="icon">${ICONS.pin}</span></div>` : ''}
                <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 0.75rem; padding-top: 0.75rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
                    ${data.personalInfo?.github ? `<span style="color: #fff;">${ICONS.github}</span>` : ''}
                    ${data.personalInfo?.linkedin ? `<span style="color: #fff;">${ICONS.linkedin}</span>` : ''}
                </div>
            </div>
        </header>

        <div class="content">
            ${data.personalInfo?.summary ? `
            <section style="page-break-inside: avoid; margin-bottom: 2rem;">
                <div class="h-section">About Me.</div>
                <p class="description" style="font-size: 11px; line-height: 1.7;">${data.personalInfo.summary}</p>
            </section>
            ` : ''}

            <div class="grid-layout">
                <div>
                    <section style="margin-bottom: 2rem;">
                        <div class="h-section">Education.</div>
                        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                            ${(data.education || []).map((edu) => `
                            <div style="page-break-inside: avoid;">
                                <div class="item-title">${edu.school}</div>
                                <div style="color: #94a3b8; font-weight: 800; font-size: 9px; margin: 0.25rem 0;">${edu.degree}</div>
                                <div class="item-date">${edu.graduationDate}</div>
                            </div>
                            `).join('')}
                        </div>
                    </section>

                    <section style="page-break-inside: avoid;">
                        <div class="h-section">Skills.</div>
                        <div style="padding-top: 0.25rem;">
                            ${(data.skills || []).map((skill) => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </section>
                </div>

                <div>
                    <section style="margin-bottom: 2rem;">
                        <div class="h-section">Experience.</div>
                        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                            ${(data.experience || []).map((exp) => `
                            <div style="page-break-inside: avoid; border-left: 2px solid #f1f5f9; padding-left: 1.25rem;">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.375rem;">
                                    <div class="item-title">${exp.position}</div>
                                    <div class="item-date">${exp.startDate} — ${exp.endDate}</div>
                                </div>
                                <div class="item-sub">${exp.company} | ${exp.location}</div>
                                <p class="description">${exp.description}</p>
                            </div>
                            `).join('')}
                        </div>
                    </section>

                    ${data.projects?.length ? `
                    <section>
                        <div class="h-section">Projects.</div>
                        <div style="display: grid; gap: 1rem;">
                            ${data.projects.map((proj) => `
                            <div style="border: 2px solid #f8fafc; padding: 0.75rem; border-radius: 0.5rem; page-break-inside: avoid;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.375rem;">
                                    <div style="font-weight: 900; font-size: 11px; text-transform: uppercase; color: #0f172a;">${proj.title}</div>
                                    <div style="display: flex; gap: 0.5rem; color: #cbd5e1;">
                                        ${proj.githubLink ? `<span>${ICONS.link}</span>` : ''}
                                    </div>
                                </div>
                                <p class="description" style="font-size: 9px; color: #94a3b8; font-style: italic;">${proj.description}</p>
                            </div>
                            `).join('')}
                        </div>
                    </section>
                    ` : ''}
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;
};
exports.creativeTemplate = creativeTemplate;
const simpleTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        ${BASE_CSS}
        body { font-family: "Times New Roman", Times, serif; color: #000; font-size: 8.5pt; line-height: 1.35; }
        .page { padding: 2rem; width: 100%; margin: 0 auto; background: #fff; }
        header { text-align: center; margin-bottom: 1.5rem; border-bottom: 1.5px solid #000; padding-bottom: 0.75rem; }
        .name { font-size: 1.25rem; font-weight: bold; text-transform: uppercase; margin: 0; letter-spacing: 0.05em; line-height: 1; }
        .contact { font-size: 9pt; margin-top: 0.5rem; font-weight: bold; }
        .section-title { font-size: 10pt; font-weight: bold; border-bottom: 1px solid #000; text-transform: uppercase; margin-top: 1.25rem; margin-bottom: 0.5rem; padding-bottom: 1px; }
        .row { display: flex; justify-content: space-between; align-items: baseline; }
        .bold { font-weight: bold; }
        .italic { font-style: italic; }
        p { margin-top: 0.25rem; text-align: justify; white-space: pre-wrap; line-height: 1.25; }
        section { page-break-inside: avoid; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <div class="page">
        <header>
            <h1 class="name">${data.personalInfo?.fullName || 'RESUME'}</h1>
            <div class="contact">
                ${[data.personalInfo?.location, data.personalInfo?.phone, data.personalInfo?.email].filter(Boolean).join(' • ')}
            </div>
            ${data.personalInfo?.linkedin || data.personalInfo?.github ? `
            <div style="font-size: 8pt; margin-top: 0.25rem; font-weight: normal; font-style: italic;">
                ${[
    data.personalInfo?.linkedin ? `LinkedIn: ${data.personalInfo.linkedin.replace('https://', '')}` : null,
    data.personalInfo?.github ? `GitHub: ${data.personalInfo.github.replace('https://', '')}` : null
].filter(Boolean).join(' | ')}
            </div>
            ` : ''}
        </header>

        ${data.personalInfo?.summary ? `
        <section>
            <div class="section-title">Professional Summary</div>
            <p>${data.personalInfo.summary}</p>
        </section>
        ` : ''}

        ${data.education?.length ? `
        <section>
            <div class="section-title">Education</div>
            ${data.education.map((edu) => `
            <div style="margin-bottom: 0.5rem; page-break-inside: avoid;">
                <div class="row">
                    <span class="bold">${edu.school}</span>
                    <span class="bold" style="font-size: 8pt;">${edu.graduationDate}</span>
                </div>
                <div class="row">
                    <span class="italic">${edu.degree}</span>
                </div>
            </div>
            `).join('')}
        </section>
        ` : ''}

        ${data.skills?.length ? `
        <section>
            <div class="section-title">Technical Skills</div>
            <p><span class="bold">Competencies:</span> ${data.skills.join(', ')}</p>
        </section>
        ` : ''}

        ${data.experience?.length ? `
        <div class="section-title">Professional Experience</div>
        ${data.experience.map((exp) => `
        <section>
            <div class="row">
                <span class="bold">${exp.company}</span>
                <span class="bold" style="font-size: 8pt;">${exp.startDate} – ${exp.endDate}</span>
            </div>
            <div class="row italic" style="font-size: 8.5pt; margin-bottom: 2px;">
                <span>${exp.position}</span>
                <span>${exp.location}</span>
            </div>
            <p>${exp.description}</p>
        </section>
        `).join('')}
        ` : ''}

        ${data.projects?.length ? `
        <div class="section-title">Featured Projects</div>
        ${data.projects.map((proj) => `
        <section>
            <div class="row">
                <span class="bold">${proj.title}</span>
                <span class="italic" style="font-size: 8pt;">${[proj.githubLink ? 'Source' : null, proj.deployedLink ? 'Live' : null].filter(Boolean).join(' | ')}</span>
            </div>
            <p class="italic" style="color: #333;">${proj.description}</p>
        </section>
        `).join('')}
        ` : ''}
    </div>
</body>
</html>
`;
exports.simpleTemplate = simpleTemplate;
