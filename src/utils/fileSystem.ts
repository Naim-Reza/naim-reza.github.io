export type FileSystemNode = {
    type: 'file' | 'directory';
    content?: string;
    children?: Record<string, FileSystemNode>;
};

export const fileSystem: Record<string, FileSystemNode> = {
    bio: {
        type: 'file',
        content: `
# Career Objective
Pursue and contribute to research focused on explainability, security, and optimization for deep learning in computer vision, particularly in biometric and healthcare applications. My goal is to develop secure, robust, and transparent AI systems that are resource-efficient and deployable in edge devices.

# Research Interests
Computer Vision; Robust & Explainable Deep Learning; Biometric Presentation Attack Detection; Model Optimization and Regularization; Efficient Learning under Data/Compute Constraints.

# Education
- M.Sc. in Computer Engineering — Chosun University, Gwangju, South Korea (Sep 2022–Aug 2024) | CGPA: 4.35/4.50
- B.Sc. in Electrical & Electronic Engineering — University of Dhaka, Bangladesh (Mar 2016–Jul 2021) | CGPA: 3.61/4.00
    `,
    },
    publications: {
        type: 'file',
        content: `
1. N. Reza, H. Y. Jung, "Cross-sensor Generalization for Fingerprint Presentation Attack Detection Leveraging Local Feature Enhancement," IEEE Transactions on Biometrics, Behavior, and Identity Science, Early Access, 2025. DOI: 10.1109/TBIOM.2025.3590827.

2. N. Reza, H. Y. Jung, "Re-calibrating Network by Refining Initial Features through Generative Gradient Regularization," IEEE Access, vol. 13, pp. 20191–20202, 2025. DOI: 10.1109/ACCESS.2025.3534216.

3. M. Al Amin, N. Reza, H. Y. Jung, "Lightweight Network for Spoof Fingerprint Detection by Attention-Aggregated Receptive Field-Wise Feature," Electronics, vol. 14, no. 9, 2025. DOI: 10.3390/electronics14091823.

4. N. Reza, H. Y. Jung, "Enhancing Ensemble Learning Using Explainable CNN for Spoof Fingerprints," Sensors, vol. 24, no. 1, 2024. DOI: 10.3390/s24010187.
    `,
    },
    news: {
        type: 'file',
        content: `
[2024] Foreign Excellence Scholarship, Chosun University (2022–2024).
[2019] "Best Institute for Innovation" Award for UAV project.
[2018-2021] President & Founding Member, FEC Scientific Research & Robotics Association.
[2017-2019] President, FEC Cultural Club.
    `,
    },
    cv: {
        type: 'file',
        content: `
NAIM REZA
Graduate Research Assistant
naim@chosun.kr | github.com/Naim-Reza | Google Scholar | LinkedIn

# Experience
Graduate Research Assistant, Computer Vision Lab, Chosun University (Sep 2022–Present)
- Explainability-Guided Optimization: Developed generative-gradient regularization to refine early-layer features.
- Fingerprint PAD: Proposed sensor scaling, liveness-score guided local enhancement.
- Efficient PAD Architectures: Designed attention-aggregated lightweight networks.

Software Engineer, Celloscope-BD (FinTech), Dhaka, Bangladesh (Sep 2021–Aug 2022)
- Designed and deployed microservice architectures.
- Instructed boot-camp cohorts on backend API development.

# Skills
- Programming: Python, C/C++, Java, JavaScript, PHP
- DL/ML: PyTorch, TensorFlow, Keras, NumPy, Pandas, scikit-learn, OpenCV
- Dev Tools: Git, Docker
- Web/Backend: Spring Boot, React, Next.js, React Native
- Paradigms: Reactive, Functional, Event-Driven, TDD, Clean Architecture

# Language Proficiency
IELTS: Overall Band Score: 7.5 (L: 7.5, R: 7.5, W: 6.0, S: 8.0)
    `,
    },
    help: {
        type: 'file',
        content: `
Available commands:
- bio: View my biography and research interests
- publications: List of my publications
- news: Awards and leadership roles
- cv: View my full Curriculum Vitae
- clear: Clear the terminal
- help: Show this help message
    `,
    },
};
