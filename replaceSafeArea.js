const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'src', 'screens');
const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(screensDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('SafeAreaView') && content.includes(`from 'react-native'`)) {
    // Remove SafeAreaView from react-native import
    content = content.replace(/import \{([^}]*)SafeAreaView([^}]*)\} from 'react-native';/g, (match, p1, p2) => {
      let rest = (p1 + p2).split(',').map(s => s.trim()).filter(s => s.length > 0).join(', ');
      return `import { ${rest} } from 'react-native';\nimport { SafeAreaView } from 'react-native-safe-area-context';`;
    });
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
  }
}
