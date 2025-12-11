import studyData from './src/data/study_data.json' with { type: "json" };
import katex from 'katex';

console.log("--- checking study_data.json ---");
if (!studyData.master_pyqs) {
    console.error("master_pyqs is MISSING!");
    process.exit(1);
}

let errorCount = 0;
studyData.master_pyqs.forEach((q, i) => {
    if (!q.question) {
        console.error(`Missing question at index ${i}`, q);
        errorCount++;
    }
    if (!q.answer) {
        console.error(`Missing answer at index ${i}`, q);
        errorCount++;
    }
});

if (errorCount === 0) {
    console.log("Data integrity: OK");
} else {
    console.log(`Data integrity: FAILED with ${errorCount} errors`);
}

console.log("\n--- checking katex ---");
try {
    const html = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}", {
        displayMode: false,
        throwOnError: false
    });
    console.log("KaTeX render success:", html.substring(0, 50) + "...");
} catch (e) {
    console.error("KaTeX render FAILED:", e);
}
