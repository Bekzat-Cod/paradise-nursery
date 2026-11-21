import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import './ProductList.css';

const FALLBACK_IMAGE =
  'https://placehold.co/400x400/e8f5e9/2e7d32?text=Plant';

/**
 * Каталог комнатных растений: три категории по шесть растений.
 */
export const plantCategories = [
  {
    title: 'Тропические растения',
    plants: [
      {
        id: 1,
        name: 'Монстера деликатесная',
        price: 24.99,
        image:
          'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=70',
        description: 'Крупные резные листья, любит рассеянный свет.',
      },
      {
        id: 2,
        name: 'Фикус лировидный',
        price: 32.5,
        image:
          'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=500&q=70',
        description: 'Эффектное дерево для светлой комнаты.',
      },
      {
        id: 3,
        name: 'Сансевиерия',
        price: 18.0,
        image:
          'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=500&q=70',
        description: 'Неприхотлива, переносит редкий полив.',
      },
      {
        id: 4,
        name: 'Эпипремнум (потос)',
        price: 15.75,
        image:
          'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=70',
        description: 'Быстрорастущая лиана для полок и кашпо.',
      },
      {
        id: 5,
        name: 'Филодендрон',
        price: 21.4,
        image:
          'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=500&q=70',
        description: 'Сердцевидные листья, тёплый влажный воздух.',
      },
      {
        id: 6,
        name: 'Алоказия',
        price: 27.9,
        image:
          'https://images.unsplash.com/photo-1509423350716-97f2360af8e3?auto=format&fit=crop&w=500&q=70',
        description: 'Крупные стреловидные листья с рельефом.',
      },
    ],
  },
  {
    title: 'Суккуленты и кактусы',
    plants: [
      {
        id: 7,
        name: 'Эхеверия',
        price: 9.99,
        image:
          'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=500&q=70',
        description: 'Розетка сочных листьев, нужен яркий свет.',
      },
      {
        id: 8,
        name: 'Алоэ вера',
        price: 14.5,
        image:
          'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=70',
        description: 'Полезный суккулент для солнечного подоконника.',
      },
      {
        id: 9,
        name: 'Толстянка (денежное дерево)',
        price: 11.2,
        image:
          'https://images.unsplash.com/photo-1493957988430-a5f2e15f39a3?auto=format&fit=crop&w=500&q=70',
        description: 'Плотные листья, полив раз в неделю.',
      },
      {
        id: 10,
        name: 'Гастерия',
        price: 8.9,
        image:
          'https://images.unsplash.com/photo-1462530260150-162092dbf011?auto=format&fit=crop&w=500&q=70',
        description: 'Компактная розетка, отлично для стола.',
      },
      {
        id: 11,
        name: 'Каланхоэ',
        price: 10.5,
        image:
          'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=70',
        description: 'Сочные листья и яркие соцветия весной.',
      },
      {
        id: 12,
        name: 'Эхинокактус',
        price: 7.99,
        image:
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=500&q=70',
        description: 'Круглый кактус, минимум ухода.',
      },
    ],
  },
  {
    title: 'Цветущие и декоративные',
    plants: [
      {
        id: 13,
        name: 'Спатифиллум',
        price: 19.99,
        image:
          'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=500&q=70',
        description: 'Белые соцветия, терпит полутень.',
      },
      {
        id: 14,
        name: 'Антуриум',
        price: 26.0,
        image:
          'https://images.unsplash.com/photo-1566836610593-62a64888a216?auto=format&fit=crop&w=500&q=70',
        description: 'Глянцевые цветы, любит влажность.',
      },
      {
        id: 15,
        name: 'Орхидея фаленопсис',
        price: 29.9,
        image:
          'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=500&q=70',
        description: 'Цветёт месяцами при правильном поливе.',
      },
      {
        id: 16,
        name: 'Бегония',
        price: 12.75,
        image:
          'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=70',
        description: 'Пёстрые листья и нежные цветы.',
      },
      {
        id: 17,
        name: 'Камелия',
        price: 22.3,
        image:
          'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=500&q=70',
        description: 'Розовые бутоны, прохладная зимовка.',
      },
      {
        id: 18,
        name: 'Гербера',
        price: 13.6,
        image:
          'https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?auto=format&fit=crop&w=500&q=70',
        description: 'Яркие ромашки на длинных цветоносах.',
      },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <main className="product-list">
      <header className="product-list-header">
        <h1>Наши растения</h1>
        <p>
          18 комнатных растений в трёх категориях. Выберите своего зелёного
          друга — мы доставим его бережно упакованным.
        </p>
      </header>

      {plantCategories.map((category) => (
        <section className="category" key={category.title}>
          <h2 className="category-title">{category.title}</h2>

          <div className="plants-grid">
            {category.plants.map((plant) => {
              const added = isInCart(plant.id);

              return (
                <article className="plant-card" key={plant.id}>
                  <img
                    className="plant-image"
                    src={plant.image}
                    alt={plant.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />

                  <div className="plant-info">
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-description">{plant.description}</p>
                    <p className="plant-price">${plant.price.toFixed(2)}</p>

                    <button
                      type="button"
                      className="add-to-cart-button"
                      disabled={added}
                      onClick={() => dispatch(addToCart(plant))}
                    >
                      {added ? 'Добавлено в корзину' : 'Добавить в корзину'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}

export default ProductList;
