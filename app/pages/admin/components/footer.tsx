export const FooterAdmin = () => {
    return (
        <>
            <StyleFooter />
            <footer>
                <div className="div-width-50-percent-left"></div>

                <div className="div-width-100-percent">
                    Todos os direitos reservados © — BCarSoftware —
                </div>

                <div className="div-width-50-percent-right"></div>
            </footer>
        </>
    );
};

const StyleFooter = () => {
    return (<style>{`
    .div-width-50-percent-left {
        width: 50%;
        text-align: left;
    }
    .div-width-50-percent-right {
        width: 50%;
        text-align: right;
    }
    .div-width-100-percent {
        width: 100%;
    }
    `}</style>);
};
