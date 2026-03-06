import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.naggaranalytics.app',
    appName: 'Naggar Analytics',
    webDir: 'public',
    server: {
        url: 'https://naggaranalytics.com/',
        cleartext: true,
        allowNavigation: [
            'naggaranalytics.kinde.com',
            '*.kinde.com',
            'naggaranalytics.com',
            '*.naggaranalytics.com'
        ]
    },
    ios: {
        allowsLinkPreview: false,
        scrollEnabled: true,
        contentInset: 'always'
    }
};

export default config;
