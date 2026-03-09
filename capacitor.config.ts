import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.naggaranalytics.app',
    appName: 'Naggar Analytics',
    webDir: 'public',
    server: {
        allowNavigation: [
            'naggaranalytics.kinde.com',
            '*.kinde.com',
            'login.kinde.com',
            'naggaranalytics.com',
            '*.naggaranalytics.com',
            'accounts.google.com',
            '*.google.com'
        ]
    },
    ios: {
        allowsLinkPreview: false,
        scrollEnabled: true,
        contentInset: 'always'
    },
    plugins: {
        App: {}
    }
};

export default config;
