function composeClassName(tokens: Array<string|[boolean, string]>): string {
    return tokens
        .reduce((classNames, token) => {
            if (typeof token === 'string') classNames.push(token);
            else {
                const [predicate, className] = token;

                if (predicate) classNames.push(className);
            }

            return classNames;
        }, [])
        .join(' ');
}

export default composeClassName;