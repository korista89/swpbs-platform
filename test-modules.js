// Node.js test script to check if all modules are structured correctly
const fs = require('fs');
const path = require('path');

console.log('=== Testing SW-PBS Module Structure ===\n');

const modulePaths = [
  'assets/js/swpbs-core.js',
  'assets/js/sample-data-generator.js',
  'modules/onboarding-wizard.js',
  'modules/tier1-module.js',
  'modules/tier2-module.js',
  'modules/tier3-module.js',
  'modules/datacenter-module.js',
  'modules/meetings-module.js'
];

const requiredExports = {
  'assets/js/swpbs-core.js': ['SWPBS', 'CSVParser', 'DataManager', 'AnalyticsEngine', 'ChartManager', 'UIManager'],
  'assets/js/sample-data-generator.js': ['SampleDataGenerator'],
  'modules/onboarding-wizard.js': ['OnboardingWizard'],
  'modules/tier1-module.js': ['Tier1Module'],
  'modules/tier2-module.js': ['Tier2Module'],
  'modules/tier3-module.js': ['Tier3Module'],
  'modules/datacenter-module.js': ['DataCenterModule'],
  'modules/meetings-module.js': ['MeetingsModule']
};

let allPassed = true;

for (const modulePath of modulePaths) {
  const fullPath = path.join(__dirname, modulePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ MISSING: ${modulePath}`);
    allPassed = false;
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const expectedExports = requiredExports[modulePath] || [];

  console.log(`\n📦 ${modulePath}`);

  for (const exportName of expectedExports) {
    // Check for class definition
    const hasClass = content.includes(`class ${exportName}`);
    const hasConst = content.includes(`const ${exportName} =`);
    const hasWindow = content.includes(`window.${exportName} = ${exportName}`);

    if (hasClass || hasConst) {
      console.log(`  ✅ ${exportName} defined`);
    } else {
      console.log(`  ❌ ${exportName} NOT defined`);
      allPassed = false;
    }

    if (hasWindow) {
      console.log(`  ✅ ${exportName} exposed to window`);
    } else {
      console.log(`  ⚠️  ${exportName} NOT exposed to window`);
      allPassed = false;
    }

    // Check for initialize method in modules
    if (exportName.includes('Module') || exportName === 'OnboardingWizard') {
      const hasInitialize = content.includes('static initialize()');
      if (hasInitialize) {
        console.log(`  ✅ ${exportName}.initialize() exists`);
      } else {
        console.log(`  ⚠️  ${exportName}.initialize() NOT found`);
      }
    }
  }
}

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ All module structure checks PASSED');
} else {
  console.log('❌ Some module structure checks FAILED');
}
console.log('='.repeat(50) + '\n');
