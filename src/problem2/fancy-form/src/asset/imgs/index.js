const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => {
        images[item.replace("./", "")] = r(item);
    });
    return images;
};

const images = importAll(require.context("../../asset/imgs", false, /\.(png|jpe?g|svg)$/));

export default images;
