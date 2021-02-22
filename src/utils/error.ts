export const extractError = (error: Array<{ code: number | string, message: string }>): string | undefined => {
    if (!!error && error.length > 0) {
        let err = "";

        error.forEach(e => {
            err += `${e.message} (${e.code})\n`
        });

        return err;
    }

    return undefined;
}

const ERR_PATTERN = /(Error: )([\w]*)/gm;

export const extract401Error = (err: string) => {
    if (!!err) {
        const s = err.match(ERR_PATTERN);
        if (!!s && s.length > 0) {
            return s[0].replace(/Error: /g, "");
        }
    }

    return "Unknown error.";
}