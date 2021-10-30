import React, { useEffect, useState } from "react";
import { useRouteMatch, useLocation } from "react-router";
import Layout from "../components/layout/Layout";
import NavbarLeft from "../components/layout/navbar/NavbarLeft";
import ProductItem from "../components/layout/product/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { getProductsBySlug, getProductsBySearchText } from "../features/product/productSlice";
const Collections = () => {
    let match = useRouteMatch();
    const { type, slug } = match.params;
    const text = new URLSearchParams(useLocation().search).get('text');
    const product = useSelector((state) => state.product);
    const { categories } = useSelector((state) => state.category);
    const { brands } = useSelector((state) => state.brand);
    const [filter, setFilter] = useState({ price: [], sizes: [], type: "price-ascending" })
    const dispatch = useDispatch();

    useEffect(() => {
        const params = { type, slug };
        if (text) {
            dispatch(getProductsBySearchText({ text }));
        } else {
            dispatch(getProductsBySlug(params));
        }
    }, [type, slug, text]);

    const getProductsBySizes = (products) => {
        const productArr = [];
        filter.sizes.map(id => {
            const pArr = products.filter(p => p.sizes.find(item => item.size._id === id))
            productArr.push(...pArr)
            return true
        })
        const uniqueArr = Array.from(new Set(productArr.map(p => p._id)))
            .map(id => {
                return productArr.find(a => a._id === id)
            })
        return uniqueArr
    }

    const getProductsByPrice = (products) => {
        const productArr = [];
        filter.price.map(type => {
            const pArr = products.filter(p => {
                const currentPrice = p.price - (p.discountPercent / 100) * p.price;
                if (type === "from0to1" && currentPrice > 0 && currentPrice < 1000000)
                    return true;
                else if (type === "from1to2" && currentPrice >= 1000000 && currentPrice < 2000000)
                    return true;
                else if (type === "from2to3" && currentPrice >= 2000000 && currentPrice < 3000000)
                    return true;
                else if (type === "more3" && currentPrice >= 3000000)
                    return true;
                return false;
            })
            productArr.push(...pArr)
        })
        const uniqueArr = Array.from(new Set(productArr.map(p => p._id)))
            .map(id => {
                return productArr.find(a => a._id === id)
            })
        return uniqueArr
    }

    const filteredProducts = () => {
        // region sort by type 
        const productArr = [...product.products].sort((a, b) => a.price - b.price);
        if (filter.type === 'price-descending') {
            productArr.reverse();
        } else if (filter.type === 'created-descending' || filter.type === 'created-ascending') {
            // sort by date descending 
            productArr.sort((a, b) => {
                var dateA = new Date(a.createdAt).getTime();
                var dateB = new Date(b.createdAt).getTime();
                return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
            })
            // sort by date ascending
            if (filter.type === 'created-ascending')
                productArr.reverse();
        }
        // end region

        if (filter.price.length === 0) {
            // if length = 0 return all products, else filter by sizes 
            return filter.sizes.length === 0 ? productArr : getProductsBySizes(productArr);
        } else {
            // if length of arr price > 0 and sizes = 0 return arr filtered by price, else both price and sizes
            return filter.sizes.length === 0 ? getProductsByPrice(productArr) : getProductsByPrice(getProductsBySizes(productArr));
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="row mgt-20">
                    <div className="col-2-4 ">
                        <NavbarLeft
                            filter={filter}
                            setFilter={setFilter}
                            categories={categories}
                            brands={brands}
                            sizes={product.sizes} />
                    </div>
                    <div className="col-8-4">
                        <div className="products">
                            <div className="row">
                                <div className="products-banner">
                                    <img
                                        className="products-banner__img"
                                        src={
                                            require("../assets/images/banner/banner-collection.jpg")
                                                .default
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="products-heading">
                                    <h2 className="products-heading-title">{product.title}</h2>
                                </div>
                                <div className="products-sort">
                                    <span className="products-sort__icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            fill="currentColor"
                                            class="bi bi-grid-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                                        </svg>
                                    </span>
                                    <div className="products-sort__body">
                                        <span className="products-sort__body-text">
                                            Sắp xếp theo:
                                        </span>
                                        <span className="products-sort__body-select">
                                            <select name="" id="" onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
                                                <option value="price-ascending">Giá: Tăng dần</option>
                                                <option value="price-descending">Giá: Giảm dần</option>
                                                <option value="created-descending">
                                                    Sản phẩm mới nhất
                                                </option>
                                                <option value="created-ascending">
                                                    Sản phẩm cũ nhất
                                                </option>
                                                <option value="best-selling">Bán chạy nhất</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                                {
                                    filteredProducts().length > 0 ?
                                        <div className="products-body">
                                            <div className="row">
                                                {filteredProducts().map((product) => (
                                                    <div className="col-3 mgt-25">
                                                        <ProductItem product={product} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        : <h1 style={{ margin: "50px" }}> Không có sản phẩm nào được tìm thấy </h1>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Collections;
