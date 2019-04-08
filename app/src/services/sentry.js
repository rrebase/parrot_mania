let Sentry;

if (process.env.BUILD_TARGET === 'client') {
    Sentry = require('@sentry/browser');
} else {
    Sentry = require('@sentry/node');
}


export const onComponentError = (error, errorInfo) => {
    if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error);
    } else {
        console.error(error);

        if (errorInfo) {
            console.error(errorInfo);
        }
    }
};


export default Sentry;
