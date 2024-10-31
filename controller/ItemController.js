


export const validName = (name) => {
    const nameRegex = /^[a-z][a-z '-.,]{0,31}$|^$/i;
    return nameRegex.test(name);
}