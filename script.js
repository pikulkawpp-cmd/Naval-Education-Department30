// แทนที่ URL ด้วย Web App URL ที่ได้จาก Google Apps Script ของคุณ
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxyow1Qk8-WntMk_qsFips6KqIaYRGlhMQEWKif08rsoprQESS3IRz45ZGHZIsDFzHP/exec';

let robloxName = "";

const questions = [
    // ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ (ข้อ 1–10)
    { id: 1, section: "ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ", title: "หน้าที่หลักของกรมยุทธศึกษาทหารเรือใน Roblox Roleplay คือข้อใด", options: ["ดูแลการซื้อขายไอเทมของผู้เล่น", "ให้ความรู้ ฝึกอบรม และพัฒนาบุคลากร", "ดูแลการก่อสร้างแมพทั้งหมด", "จัดกิจกรรมเพื่อความบันเทิงเท่านั้น"], answer: "ข" },
    { id: 2, section: "ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ", title: "บุคลากรของกรมยุทธศึกษาทหารเรือควรมีคุณสมบัติใดมากที่สุด", options: ["มีตำแหน่งสูงกว่าผู้อื่น", "เล่นเกมได้ตลอดเวลา", "มีวินัย รับผิดชอบ และพร้อมเรียนรู้", "รู้จักผู้บริหารเป็นการส่วนตัว"], answer: "ค" },
    { id: 3, section: "ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ", title: "หากได้รับมอบหมายให้จัดการฝึกอบรม ควรทำสิ่งใดเป็นอันดับแรก", options: ["วางแผนการฝึกและเตรียมเนื้อหา", "เริ่มฝึกทันทีโดยไม่ต้องเตรียมตัว", "ให้ผู้เข้าฝึกเลือกทำอะไรก็ได้", "ยกเลิกการฝึกหากมีผู้เข้าร่วมน้อย"], answer: "ก" },
    { id: 4, section: "ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ", title: "จุดประสงค์สำคัญของการฝึกอบรมกำลังพลคืออะไร", options: ["ทำให้ทุกคนมีตำแหน่งเท่ากัน", "เพิ่มจำนวนสมาชิกในเซิร์ฟเวอร์", "ทำให้ผู้เข้าฝึกเล่นเกมได้เร็วขึ้นเท่านั้น", "เพิ่มความรู้ ทักษะ และความมีระเบียบวินัย"], answer: "ง" },
    { id: 5, section: "ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ", title: "ข้อใดเป็นหน้าที่ของครูฝึก", options: ["สั่งลงโทษผู้เล่นได้ทุกกรณี", "สอน ชี้แจง และประเมินผลผู้เข้าฝึก", "เปลี่ยนกฎของเซิร์ฟเวอร์ได้ตามใจ", "เลือกสอนเฉพาะคนที่สนิท"], answer: "ข" },
    { id: 6, section: "ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ", title: "หากผู้เข้าฝึกไม่เข้าใจคำสั่ง ครูฝึกควรทำอย่างไร", options: ["ไล่ออกจากการฝึกทันที", "เพิกเฉยและดำเนินการต่อ", "อธิบายคำสั่งใหม่ให้ชัดเจน", "ตำหนิต่อหน้าทุกคน"], answer: "ค" },
    { id: 7, section: "ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ", title: "การประเมินผลผู้เข้าฝึกควรพิจารณาจากอะไร", options: ["ความสามารถ ความเข้าใจ และการปฏิบัติตามเกณฑ์", "ความสนิทสนมกับครูฝึก", "ระยะเวลาที่เป็นสมาชิกเซิร์ฟเวอร์เพียงอย่างเดียว", "ยศของผู้เข้าฝึก"], answer: "ก" },
    { id: 8, section: "ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ", title: "หากต้องการปรับปรุงหลักสูตรฝึกอบรม ควรทำอย่างไร", options: ["เปลี่ยนหลักสูตรทุกวันโดยไม่แจ้งใคร", "ยกเลิกหลักสูตรเดิมทั้งหมด", "ใช้หลักสูตรเดิมตลอดไป", "รวบรวมข้อเสนอแนะและพิจารณาปรับปรุงอย่างเหมาะสม"], answer: "ง" },
    { id: 9, section: "ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ", title: "ข้อใดแสดงถึงความเป็นมืออาชีพของครูฝึก", options: ["ใช้อารมณ์ในการตัดสินผู้เข้าฝึก", "เตรียมตัวดี สื่อสารชัดเจน และปฏิบัติอย่างยุติธรรม", "เลือกปฏิบัติต่อสมาชิกแต่ละคน", "ละเลยหน้าที่เมื่อไม่มีผู้บังคับบัญชาอยู่"], answer: "ข" },
    { id: 10, section: "ส่วนที่ 1: ความรู้เกี่ยวกับกรมยุทธศึกษาทหารเรือ", title: "หากผู้เข้าฝึกสอบไม่ผ่าน ควรดำเนินการอย่างไร", options: ["ให้ผ่านทุกคนเพื่อรักษาจำนวนสมาชิก", "ห้ามผู้เข้าฝึกกลับมาสอบอีก", "แจ้งผลตามจริง พร้อมแนะนำจุดที่ควรพัฒนา", "เปลี่ยนคะแนนตามความพอใจของครูฝึก"], answer: "ค" },

    // ส่วนที่ 2: วินัยและการบังคับบัญชา (ข้อ 11–20)
    { id: 11, section: "ส่วนที่ 2: วินัยและการบังคับบัญชา", title: "เมื่อผู้บังคับบัญชาได้รับมอบหมายงานที่อยู่ในขอบเขตหน้าที่ ควรทำอย่างไร", options: ["รับทราบ ทำความเข้าใจ และดำเนินงานตามคำสั่ง", "ปฏิเสธทุกครั้ง", "ส่งงานให้ผู้อื่นโดยไม่แจ้ง", "รอจนกว่าจะมีคนมาถาม"], answer: "ก" },
    { id: 12, section: "ส่วนที่ 2: วินัยและการบังคับบัญชา", title: "หากได้รับคำสั่งที่ไม่ชัดเจน ควรทำอย่างไร", options: ["คาดเดาแล้วดำเนินการทันทีทุกกรณี", "เพิกเฉยต่อคำสั่ง", "ทำตามที่ตนเองต้องการ", "สอบถามเพื่อให้เข้าใจตรงกันก่อนปฏิบัติ"], answer: "ง" },
    { id: 13, section: "ส่วนที่ 2: วินัยและการบังคับบัญชา", title: "การเคารพผู้บังคับบัญชาใน Roleplay หมายถึงข้อใด", options: ["ต้องเห็นด้วยกับทุกเรื่องเสมอ", "ให้เกียรติ ปฏิบัติตามระเบียบ และสื่อสารอย่างเหมาะสม", "ห้ามแสดงความคิดเห็นทุกกรณี", "เชื่อฟังแม้เป็นคำสั่งที่ละเมิดกฎเซิร์ฟเวอร์"], answer: "ข" },
    { id: 14, section: "ส่วนที่ 2: วินัยและการบังคับบัญชา", title: "หากพบเพื่อนร่วมกรมละเลยหน้าที่ ควรทำอย่างไร", options: ["ประกาศประจานในห้องแชต", "ทะเลาะกับบุคคลนั้น", "แจ้งเตือนอย่างเหมาะสมหรือรายงานผู้รับผิดชอบ", "เพิกเฉยทุกกรณี"], answer: "ค" },
    { id: 15, section: "ส่วนที่ 2: วินัยและการบังคับบัญชา", title: "ข้อใดเป็นการใช้ตำแหน่งหน้าที่อย่างไม่เหมาะสม", options: ["ใช้อำนาจเพื่อประโยชน์ส่วนตัว", "แบ่งงานตามความสามารถ", "ตรวจสอบผลการปฏิบัติงาน", "ช่วยเหลือสมาชิกที่มีปัญหา"], answer: "ก" },
    { id: 16, section: "ส่วนที่ 2: วินัยและการบังคับบัญชา", title: "หากมีความขัดแย้งระหว่างสมาชิกสองคน ควรทำอย่างไร", options: ["เข้าข้างเพื่อนสนิท", "ลงโทษทั้งคู่โดยไม่ตรวจสอบ", "ปล่อยให้ทะเลาะกันจนจบ", "รับฟังทั้งสองฝ่ายและพิจารณาข้อเท็จจริง"], answer: "ง" },
    { id: 17, section: "ส่วนที่ 2: วินัยและการบังคับบัญชา", title: "ข้อใดเป็นลักษณะของผู้บังคับบัญชาที่ดี", options: ["สั่งงานอย่างเดียวโดยไม่รับฟัง", "รับผิดชอบ เป็นธรรม และเป็นแบบอย่างที่ดี", "ใช้อำนาจข่มขู่สมาชิก", "มอบหมายงานโดยไม่ติดตามผล"], answer: "ข" },
    { id: 18, section: "ส่วนที่ 2: วินัยและการบังคับบัญชา", title: "หากไม่สามารถเข้าร่วมการฝึกตามเวลาที่กำหนดได้ ควรทำอย่างไร", options: ["ออกจากเซิร์ฟเวอร์โดยไม่แจ้ง", "ปล่อยให้ผู้อื่นรอ", "แจ้งผู้รับผิดชอบล่วงหน้าหรือทันทีที่ทำได้", "ให้เพื่อนลงชื่อแทน"], answer: "ค" },
    { id: 19, section: "ส่วนที่ 2: วินัยและการบังคับบัญชา", title: "การรักษาความลับของหน่วยงานในเกมควรเป็นอย่างไร", options: ["ไม่เผยแพร่ข้อมูลภายในที่ไม่ควรเปิดเผย และปฏิบัติตามกฎ", "ส่งข้อมูลทุกอย่างให้คนนอก", "เผยแพร่ข้อความส่วนตัวเพื่อความสนุก", "เปิดเผยรหัสผ่านให้สมาชิกทุกคน"], answer: "ก" },
    { id: 20, section: "ส่วนที่ 2: วินัยและการบังคับบัญชา", title: "หากผู้บังคับบัญชาปฏิบัติผิดกฎเซิร์ฟเวอร์ ควรทำอย่างไร", options: ["ทำตามเพราะเป็นผู้บังคับบัญชา", "โต้เถียงและด่าทอในที่สาธารณะ", "เผยแพร่ข้อมูลส่วนตัวของผู้บังคับบัญชา", "ใช้ช่องทางรายงานที่เหมาะสมพร้อมข้อมูลที่ตรวจสอบได้"], answer: "ง" },

    // ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay (ข้อ 21–30)
    { id: 21, section: "ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay", title: "ก่อนเริ่มกิจกรรมฝึก ควรแจ้งข้อมูลใดแก่ผู้เข้าร่วม", options: ["เฉพาะชื่อของครูฝึก", "วัตถุประสงค์ กำหนดการ และกฎที่เกี่ยวข้อง", "เฉพาะเวลาสิ้นสุดกิจกรรม", "ไม่จำเป็นต้องแจ้งข้อมูล"], answer: "ข" },
    { id: 22, section: "ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay", title: "หากมีผู้เข้าฝึกจำนวนมาก ควรจัดการอย่างไร", options: ["ให้ทุกคนทำกิจกรรมพร้อมกันโดยไม่มีการควบคุม", "รับสมัครเพิ่มโดยไม่จำกัดจำนวน", "แบ่งกลุ่มและจัดลำดับการฝึกให้เหมาะสม", "ยกเลิกกิจกรรมทันที"], answer: "ค" },
    { id: 23, section: "ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay", title: "หากเกิดปัญหาทางเทคนิคใน Roblox ระหว่างการฝึก ควรทำอย่างไร", options: ["แจ้งผู้เข้าร่วมและประสานผู้ดูแลเพื่อแก้ไข", "กล่าวโทษผู้เข้าฝึกทุกคน", "ลบข้อมูลของผู้เข้าร่วม", "ปล่อยให้ทุกคนแก้ปัญหาเองโดยไม่แจ้ง"], answer: "ก" },
    { id: 24, section: "ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay", title: "การเขียนประกาศกิจกรรมที่ดีควรมีลักษณะใด", options: ["ใช้ข้อความกำกวมเพื่อให้สมาชิกสอบถาม", "ใช้คำสั่งสั้น ๆ โดยไม่บอกกำหนดการ", "เขียนเฉพาะชื่อกิจกรรม", "ระบุหัวข้อ เวลา สถานที่ และรายละเอียดที่จำเป็นอย่างชัดเจน"], answer: "ง" },
    { id: 25, section: "ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay", title: "หากสมาชิกฝ่าฝืนกฎระหว่างการฝึก ควรทำอย่างไร", options: ["ลงโทษทันทีโดยไม่ตรวจสอบ", "ตรวจสอบเหตุการณ์และดำเนินการตามระเบียบ", "ยกเว้นให้สมาชิกที่สนิท", "ยุติการฝึกทุกครั้งที่เกิดปัญหา"], answer: "ข" },
    { id: 26, section: "ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay", title: "ข้อใดเป็นการใช้ Discord อย่างเหมาะสมในการทำงานของกรม", options: ["ส่งข้อความรบกวนทุกห้อง", "ใช้ห้องประกาศพูดคุยเรื่องทั่วไปตลอดเวลา", "ใช้ห้องให้ตรงวัตถุประสงค์และปฏิบัติตามกฎ", "ลบข้อความของผู้อื่นโดยไม่มีเหตุผล"], answer: "ค" },
    { id: 27, section: "ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay", title: "หากได้รับมอบหมายให้จัดทำรายงานผลการฝึก ควรใส่ข้อมูลใด", options: ["รายชื่อผู้เข้าร่วม ผลการฝึก และข้อมูลที่เกี่ยวข้องตามจริง", "เฉพาะชื่อของผู้จัดกิจกรรม", "คะแนนที่แต่งขึ้นเพื่อให้ดูดี", "ความคิดเห็นส่วนตัวโดยไม่กล่าวถึงผลการฝึก"], answer: "ก" },
    { id: 28, section: "ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay", title: "หากมีสมาชิกใหม่เข้ากรม ควรช่วยเหลืออย่างไร", options: ["ให้เรียนรู้ทุกอย่างด้วยตนเอง", "มอบหมายงานทั้งหมดทันที", "ปฏิเสธการตอบคำถาม", "แนะนำกฎ หน้าที่ ช่องทางติดต่อ และขั้นตอนการทำงาน"], answer: "ง" },
    { id: 29, section: "ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay", title: "หากต้องเลือกระหว่างทำงานให้เสร็จเร็วกับทำงานให้ถูกต้อง ควรยึดหลักใด", options: ["ทำให้เร็วที่สุดโดยไม่ต้องตรวจสอบ", "ทำงานให้ถูกต้องตามมาตรฐานและกำหนดเวลาอย่างเหมาะสม", "ส่งงานที่ยังไม่เสร็จโดยไม่แจ้ง", "ให้ผู้อื่นรับผิดชอบแทนเสมอ"], answer: "ข" },
    { id: 30, section: "ส่วนที่ 3: การปฏิบัติงานและสถานการณ์ใน Roleplay", title: "เป้าหมายสูงสุดของกรมยุทธศึกษาทหารเรือใน Roblox Roleplay ควรเป็นข้อใด", options: ["ทำให้กรมมีสมาชิกมากที่สุดเท่านั้น", "ทำให้ทุกคนมียศสูง", "พัฒนาความรู้ วินัย ทักษะ และคุณภาพของกำลังพล", "ทำให้กรมมีอำนาจเหนือทุกหน่วยงาน"], answer: "ค" }
];

const prefixes = ["ก", "ข", "ค", "ง"];

function goToRegister() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("register-screen").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuiz(event) {
    event.preventDefault();
    robloxName = document.getElementById("roblox-name").value;

    document.getElementById("register-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    document.getElementById("user-greeting").innerText = `ผู้สอบ: ${robloxName}`;

    renderQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuiz() {
    const container = document.getElementById("questions-container");
    container.innerHTML = "";
    let currentSection = "";

    questions.forEach((q) => {
        if (q.section !== currentSection) {
            currentSection = q.section;
            const sectionHeader = document.createElement("div");
            sectionHeader.className = "section-header";
            sectionHeader.innerText = currentSection;
            container.appendChild(sectionHeader);
        }

        const card = document.createElement("div");
        card.className = "question-card";

        let optionsHTML = "";
        q.options.forEach((opt, i) => {
            const prefix = prefixes[i];
            optionsHTML += `
                <label>
                    <input type="radio" name="q${q.id}" value="${prefix}" required>
                    <strong>${prefix}.</strong>&nbsp;${opt}
                </label>
            `;
        });

        card.innerHTML = `
            <div class="question-text">${q.id}. ${q.title}</div>
            <div class="options">${optionsHTML}</div>
        `;
        container.appendChild(card);
    });
}

function calculateScore() {
    let score = 0;
    let answered = 0;

    questions.forEach(q => {
        const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
        if (selected) {
            answered++;
            if (selected.value === q.answer) {
                score++;
            }
        }
    });

    if (answered < questions.length) {
        if (!confirm(`ท่านยังทำข้อสอบไม่ครบ (ทำไป ${answered}/30 ข้อ) ต้องการส่งข้อสอบเลยหรือไม่?`)) {
            return;
        }
    }

    const total = questions.length;
    const percentage = ((score / total) * 100).toFixed(1);
    const isPass = score >= 25; // เกณฑ์ผ่าน 25 คะแนน
    const statusStr = isPass ? "ผ่านเกณฑ์" : "ไม่ผ่านเกณฑ์";

    // สลับไปยังหน้าแสดงผลการประเมิน (Result Screen)
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const statusBadge = document.getElementById("status-badge");
    const resultName = document.getElementById("result-name");
    const scoreText = document.getElementById("score-text");
    const percentageText = document.getElementById("percentage-text");
    const saveStatus = document.getElementById("save-status");

    if (isPass) {
        statusBadge.className = "pass";
        statusBadge.innerText = "🎉 ผลการสอบ: ผ่านเกณฑ์การคัดเลือก (ต้องได้ 25 คะแนนขึ้นไป)";
    } else {
        statusBadge.className = "fail";
        statusBadge.innerText = "❌ ผลการสอบ: ไม่ผ่านเกณฑ์ (ต้องได้ 25 คะแนนขึ้นไป)";
    }

    resultName.innerText = `ยศ-ชื่อ: ${robloxName}`;
    scoreText.innerText = score;
    percentageText.innerText = `คิดเป็น: ${percentage}%`;
    saveStatus.innerText = "⏳ กำลังบันทึกคะแนนลง Google Sheet...";

    // ส่งข้อมูลไปยัง Google Sheet
    const payload = {
        name: robloxName,
        info: "-", 
        score: score,
        total: total,
        percentage: percentage + "%",
        status: statusStr
    };

    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        saveStatus.innerText = "✅ บันทึกคะแนนลง Google Sheet เรียบร้อยแล้ว";
    })
    .catch((error) => {
        console.error("Error:", error);
        saveStatus.innerText = "❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล";
    });
}

function downloadResultImage() {
    const targetElement = document.getElementById("capture-area");
    const saveStatus = document.getElementById("save-status");

    if (saveStatus) saveStatus.style.display = "none";

    html2canvas(targetElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0b1329"
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `ผลการสอบ_${robloxName}.png`;
        link.click();

        if (saveStatus) saveStatus.style.display = "block";
    });
}