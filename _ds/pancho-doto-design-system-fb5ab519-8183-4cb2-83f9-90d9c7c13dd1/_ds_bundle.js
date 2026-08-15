/* @ds-bundle: {"format":4,"namespace":"PanchoDotoDesignSystem_fb5ab5","components":[{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"ToppingTile","sourcePath":"components/commerce/ToppingTile.jsx"},{"name":"ToppingGroupLabel","sourcePath":"components/commerce/ToppingTile.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"PriceTag","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"MascotGuide","sourcePath":"components/core/MascotGuide.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"ModalInput","sourcePath":"components/feedback/Modal.jsx"},{"name":"TabNav","sourcePath":"components/navigation/TabNav.jsx"}],"sourceHashes":{"components/commerce/ProductCard.jsx":"7a780838d92c","components/commerce/ToppingTile.jsx":"a2c8386da4ba","components/core/Badge.jsx":"0b25d935c432","components/core/Button.jsx":"a26912b17c46","components/core/MascotGuide.jsx":"71bc8ca1e47b","components/feedback/Modal.jsx":"e4c52c7e2bec","components/navigation/TabNav.jsx":"ff9d54bf9bff","ui_kits/menu-digital/MenuDigital.jsx":"65465d825525"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PanchoDotoDesignSystem_fb5ab5 = window.PanchoDotoDesignSystem_fb5ab5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/ProductCard.jsx
try { (() => {
function ProductCard({
  image,
  title,
  description,
  price,
  badge
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-card)',
      padding: 'var(--space-card-padding)',
      boxShadow: 'var(--shadow-md)',
      transform: hover ? 'scale(1.02)' : 'scale(1)',
      transition: `transform var(--motion-duration-microfeedback) var(--motion-ease-ui)`,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      fontFamily: 'var(--font-ui)'
    }
  }, badge ? /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-start'
    }
  }, badge) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      color: 'var(--color-text-primary)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, description) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-price-display)',
      color: 'var(--color-accent-primary)'
    }
  }, price));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ToppingTile.jsx
try { (() => {
function ToppingTile({
  image,
  label,
  selected,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      background: 'var(--color-bg-surface)',
      borderRadius: 'var(--radius-card)',
      border: selected ? '2px solid var(--color-accent-primary)' : '2px solid transparent',
      padding: 'var(--space-2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-1)',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      aspectRatio: '1/1',
      overflow: 'hidden',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: label,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-primary)',
      textAlign: 'center'
    }
  }, label));
}
function ToppingGroupLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--color-text-secondary)',
      fontWeight: 700
    }
  }, children);
}
Object.assign(__ds_scope, { ToppingTile, ToppingGroupLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ToppingTile.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function Badge({
  tone = 'accent',
  children
}) {
  const tones = {
    accent: {
      background: 'var(--color-accent-primary)',
      color: 'var(--color-text-on-accent)'
    },
    secondary: {
      background: 'var(--color-accent-secondary)',
      color: '#fff'
    },
    neutral: {
      background: 'var(--color-bg-surface)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border-subtle)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: 'var(--text-xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      padding: '4px 10px',
      borderRadius: 'var(--radius-interactive)',
      ...tones[tone]
    }
  }, children);
}
function PriceTag({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-price-display)',
      color: 'var(--color-accent-primary)'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge, PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled,
  type = 'button'
}) {
  const base = {
    fontFamily: 'var(--font-ui)',
    fontWeight: 700,
    border: 'none',
    borderRadius: 'var(--radius-interactive)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `transform var(--motion-duration-microfeedback) var(--motion-ease-ui), background var(--motion-duration-microfeedback) var(--motion-ease-ui)`,
    opacity: disabled ? 0.5 : 1,
    whiteSpace: 'nowrap'
  };
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 'var(--text-sm)'
    },
    md: {
      padding: '12px 24px',
      fontSize: 'var(--text-cta-label)'
    },
    lg: {
      padding: '16px 32px',
      fontSize: 'var(--text-lg)'
    }
  };
  const variants = {
    primary: {
      background: 'var(--color-accent-primary)',
      color: 'var(--color-text-on-accent)'
    },
    secondary: {
      background: 'var(--color-accent-secondary)',
      color: '#fff'
    },
    solidDark: {
      background: 'var(--color-nearblack-950)',
      color: 'var(--color-accent-primary)'
    },
    solidPanel: {
      background: 'var(--color-bg-panel)',
      color: 'var(--color-text-on-panel)'
    },
    pedidosya: {
      background: '#EA1D2C',
      color: '#fff'
    },
    brown: {
      background: '#6B3A1F',
      color: '#F7CE66'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border-subtle)'
    }
  };
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const hoverBg = {
    primary: 'var(--color-accent-primary-hover)',
    secondary: 'var(--color-accent-secondary-hover)'
  };
  const style = {
    ...base,
    ...sizes[size],
    ...variants[variant]
  };
  if (hover && !disabled && hoverBg[variant]) style.background = hoverBg[variant];
  if (active && !disabled) style.transform = 'scale(0.98)';
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    style: style,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/MascotGuide.jsx
try { (() => {
function MascotGuide({
  src,
  pose = 'eating',
  size = 'accent'
}) {
  const sizes = {
    hero: 280,
    accent: 96
  };
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: `Mascota Pancho Doto (${pose})`,
    style: {
      width: sizes[size],
      height: 'auto',
      zIndex: 'var(--z-mascot)',
      position: 'relative'
    }
  });
}
Object.assign(__ds_scope, { MascotGuide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MascotGuide.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Modal({
  open,
  onClose,
  title,
  children,
  ctaLabel,
  onCta
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(31,10,12,0.72)',
      zIndex: 'var(--z-modal-overlay)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-4)'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--color-bg-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 'var(--z-modal-content)',
      padding: 'var(--space-8)',
      maxWidth: 420,
      width: '100%',
      fontFamily: 'var(--font-ui)',
      color: 'var(--color-text-primary)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)'
    }
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--color-text-secondary)'
    }
  }, children), ctaLabel ? /*#__PURE__*/React.createElement("button", {
    onClick: onCta,
    style: {
      background: 'var(--color-accent-primary)',
      color: 'var(--color-text-on-accent)',
      border: 'none',
      borderRadius: 'var(--radius-interactive)',
      padding: '12px 24px',
      fontWeight: 700,
      fontFamily: 'var(--font-ui)',
      cursor: 'pointer',
      alignSelf: 'flex-start'
    }
  }, ctaLabel) : null));
}
function ModalInput({
  label,
  ...props
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({}, props, {
    style: {
      background: 'var(--color-bg-base)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-input)',
      padding: '10px 14px',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)'
    }
  })));
}
Object.assign(__ds_scope, { Modal, ModalInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabNav.jsx
try { (() => {
function TabNav({
  tabs,
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      height: 'var(--space-nav-height)',
      background: 'color-mix(in srgb, var(--color-bg-base) 92%, transparent)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      position: 'sticky',
      top: 0,
      zIndex: 'var(--z-nav-sticky)',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      padding: '0 var(--space-4)',
      maxWidth: '1100px',
      width: '100%',
      margin: '0 auto',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory'
    }
  }, tabs.map(tab => {
    const isActive = tab === active;
    return /*#__PURE__*/React.createElement("button", {
      key: tab,
      onClick: () => onChange && onChange(tab),
      style: {
        scrollSnapAlign: 'start',
        flexShrink: 0,
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        padding: 'var(--space-2) var(--space-4)',
        borderRadius: 'var(--radius-interactive)',
        border: 'none',
        cursor: 'pointer',
        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        background: isActive ? 'rgba(139,26,38,0.25)' : 'transparent',
        boxShadow: isActive ? 'inset 0 -3px 0 var(--color-accent-secondary)' : 'none',
        whiteSpace: 'nowrap'
      }
    }, tab);
  })));
}
Object.assign(__ds_scope, { TabNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/menu-digital/MenuDigital.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SECTIONS = ['Sabores', 'Menú', 'Bebidas', 'Promos', 'Historia', 'Ubicaciones'];
const MENU_ITEMS = [{
  image: '../../assets/products/pancho-clasico.webp',
  title: 'Pancho Clásico',
  description: 'Salchicha, pan, ketchup y mostaza',
  price: '$3.200'
}, {
  image: '../../assets/products/pancho-chili.webp',
  title: 'Pancho Chili',
  description: 'Con chili, cebolla y mostaza',
  price: '$3.800'
}, {
  image: '../../assets/products/cono-papas-marca.png',
  title: 'Cono de Papas Doto',
  description: 'Papas fritas con mayonesa de la casa',
  price: '$2.800'
}, {
  image: '../../assets/products/cono-papas.webp',
  title: 'Cono de Papas Simple',
  description: 'Clásicas, crocantes',
  price: '$2.400'
}];
const TOPPINGS = [{
  image: '../../assets/toppings/mayonesas.png',
  label: '3 Mayonesas'
}, {
  image: '../../assets/toppings/chimichurri.png',
  label: 'Chimichurri picante'
}, {
  image: '../../assets/toppings/papas-fritas.png',
  label: 'Papas extra'
}];
const DRINKS = [{
  image: '../../assets/beverages/coca-vidrio.webp',
  title: 'Coca-Cola vidrio',
  price: '$1.500'
}, {
  image: '../../assets/beverages/coca-plastico.webp',
  title: 'Coca-Cola 500ml',
  price: '$1.800'
}, {
  image: '../../assets/beverages/stella-artois.png',
  title: 'Stella Artois lata',
  price: '$2.200'
}];
function MenuDigital() {
  const {
    Button,
    MascotGuide
  } = window.PanchoDotoDesignSystem_fb5ab5;
  const {
    ProductCard,
    ToppingTile,
    ToppingGroupLabel
  } = window.PanchoDotoDesignSystem_fb5ab5;
  const {
    TabNav
  } = window.PanchoDotoDesignSystem_fb5ab5;
  const {
    Modal,
    ModalInput
  } = window.PanchoDotoDesignSystem_fb5ab5;
  const [active, setActive] = React.useState('Sabores');
  const [selectedTopping, setSelectedTopping] = React.useState(0);
  const [newsletterOpen, setNewsletterOpen] = React.useState(false);
  const sectionStyle = {
    padding: 'var(--space-section-y) var(--space-4)',
    maxWidth: 1100,
    margin: '0 auto'
  };
  const headlineStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-section-headline)',
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--space-6)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-base)',
      minHeight: '100vh',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-6)',
      background: 'linear-gradient(135deg, var(--color-bordeaux-700), var(--color-bordeaux-600), var(--color-yellow-500))',
      padding: 'var(--space-8) var(--space-4)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-script)',
      fontSize: 'clamp(2.5rem,10vw,4.5rem)',
      color: 'var(--color-nearblack-950)'
    }
  }, "Pancho Doto"), /*#__PURE__*/React.createElement(MascotGuide, {
    src: "../../assets/mascot/mascot-pointing.png",
    pose: "pointing",
    size: "hero"
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/logo.png",
    alt: "Pancho Doto",
    style: {
      height: 96
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 480,
      color: 'var(--color-nearblack-950)',
      fontSize: 'var(--text-lg)',
      fontWeight: 600
    }
  }, "Tu s\xFAper pancho, a tu manera. Desde 1999 los mejores panchos de la zona."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "solidDark",
    onClick: () => setActive('Menú')
  }, "Ver el men\xFA"), /*#__PURE__*/React.createElement(Button, {
    variant: "solidPanel"
  }, "Pedir por PedidosYa"))), /*#__PURE__*/React.createElement(TabNav, {
    tabs: SECTIONS,
    active: active,
    onChange: setActive
  }), /*#__PURE__*/React.createElement("section", {
    style: sectionStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: headlineStyle
  }, "\xBFC\xF3mo lo combin\xE1s vos?"), /*#__PURE__*/React.createElement(ToppingGroupLabel, null, "Salsas de la casa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-2)'
    }
  }, TOPPINGS.map((t, i) => /*#__PURE__*/React.createElement(ToppingTile, {
    key: t.label,
    image: t.image,
    label: t.label,
    selected: selectedTopping === i,
    onClick: () => setSelectedTopping(i)
  })))), /*#__PURE__*/React.createElement("section", {
    style: sectionStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: headlineStyle
  }, "Men\xFA"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 'var(--space-gap-grid)'
    }
  }, MENU_ITEMS.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.title
  }, p))))), /*#__PURE__*/React.createElement("section", {
    style: sectionStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: headlineStyle
  }, "Bebidas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 'var(--space-gap-grid)'
    }
  }, DRINKS.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.title
  }, p))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...sectionStyle,
      background: 'var(--color-bg-product-block)',
      borderRadius: 'var(--radius-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: headlineStyle
  }, "Nuestra historia"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/backgrounds/graffiti-3.png",
    style: {
      width: 220,
      borderRadius: 'var(--radius-card)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-panel)',
      color: 'var(--color-text-on-panel)',
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-card)',
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("p", null, "Desde 1999 los mejores panchos de la zona. Dos locales en San Nicol\xE1s de los Arroyos y presencia en Villa Constituci\xF3n.")))), /*#__PURE__*/React.createElement("section", {
    style: sectionStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: headlineStyle
  }, "Ubicaciones"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 'var(--space-gap-grid)'
    }
  }, ['Italia 17', 'Mitre 337'].map(addr => /*#__PURE__*/React.createElement("div", {
    key: addr,
    style: {
      background: 'var(--color-bg-panel)',
      color: 'var(--color-text-on-panel)',
      padding: 'var(--space-4)',
      borderRadius: 'var(--radius-card)'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "San Nicol\xE1s"), /*#__PURE__*/React.createElement("br", null), addr)))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...sectionStyle,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(MascotGuide, {
    src: "../../assets/mascot/mascot-eating.png",
    pose: "eating",
    size: "accent"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setNewsletterOpen(true)
  }, "Quiero mi c\xF3digo"))), /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: 'var(--space-8) var(--space-4)',
      textAlign: 'center',
      color: 'var(--color-text-secondary)',
      borderTop: '1px solid var(--color-border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/logo.png",
    style: {
      height: 56,
      marginBottom: 'var(--space-3)'
    }
  }), /*#__PURE__*/React.createElement("div", null, "@panchodotosan_nicolas")), /*#__PURE__*/React.createElement(Modal, {
    open: newsletterOpen,
    onClose: () => setNewsletterOpen(false),
    title: "Sumate y llevate un c\xF3digo",
    ctaLabel: "Quiero mi c\xF3digo",
    onCta: () => setNewsletterOpen(false)
  }, /*#__PURE__*/React.createElement(ModalInput, {
    label: "Tu email",
    type: "email",
    placeholder: "vos@mail.com"
  })));
}
window.MenuDigital = MenuDigital;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/menu-digital/MenuDigital.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.ToppingTile = __ds_scope.ToppingTile;

__ds_ns.ToppingGroupLabel = __ds_scope.ToppingGroupLabel;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.MascotGuide = __ds_scope.MascotGuide;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.ModalInput = __ds_scope.ModalInput;

__ds_ns.TabNav = __ds_scope.TabNav;

})();
