import { FC, useState } from 'react'
import { ICard } from '../../types/types'
import { CheckboxGroup } from '../UI/CheckBoxGroup/CheckboxGroup'
import './createCard.scss'

export interface ICheckedGroup {
  [T: string]: string[]
}

export interface ICheckboxGroupOption {
  option: {
    optionNameRu: string
    optionNameOnBackend: string
  }
  entities: string[]
}

export interface CreateCardProps {
  setPosts: (a: any) => void
  setmodulCreateCard: (a: any) => void
  modulCreateCard: boolean
  posts: ICard[]
}

const CreateCard: FC<CreateCardProps> = ({
  posts,
  setPosts,
  setmodulCreateCard,
  modulCreateCard,
}) => {

  
  const [cardInput, setCardInput] = useState({
    title: '',
    urlImg: '',
    barcode: '',
    manufacturer: '',
    brand: '',
    description: '',
    price: '',
    size: '',
  })

  const checkboxGroupOptions: ICheckboxGroupOption[] = [
    {
      option: { optionNameRu: 'Категория', optionNameOnBackend: 'category' },
      entities: ['Уход за телом', 'Уход за руками'],
    },
    // {
    //   option: { optionNameRu: 'Форма', optionNameOnBackend: 'form' },
    //   entities: ['/img/cardbox.svg', '/img/cardbottle.svg'],
    // },
  ]
  const [checkedBoxByGroup, setCheckedBoxByGroup] = useState<ICheckedGroup>({
    category: [],
    form: [],
  })



  const handleChangeCheckedBoxGroup = (
    { target: { checked, value } }: any,
    nameGroup: string | number
  ) => {
    if (checked) {
      if (checkedBoxByGroup[nameGroup].includes(value)) {
        setCheckedBoxByGroup((prevState) => ({
          ...prevState,
        }))
      } else {
        setCheckedBoxByGroup((prevState) => ({
          ...prevState,
          [nameGroup]: [...prevState[nameGroup], value],
        }))
      }
    } else {
      setCheckedBoxByGroup((prevState) => ({
        ...prevState,
        [nameGroup]: [...prevState[nameGroup].filter((x) => x !== value)],
      }))
    }
  }

  const addNewCard = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const newCard = {
      id: Date.now(),
      title : cardInput.title,
      urlImg:  cardInput.urlImg,
      barcode: Number(cardInput.barcode),
      manufacturer : cardInput.manufacturer,
      brand: cardInput.brand,
      description : cardInput.description,
      price: Number(cardInput.price),
      size: cardInput.size,
      care: checkedBoxByGroup.category,
      type: '/img/cardbottle.svg',
      counter: 1,
    }
    setmodulCreateCard(true)

    const arr = [...posts, newCard]
    setPosts((prev: any) => [...prev, newCard])

    localStorage.setItem('card', JSON.stringify(arr))

    console.log(JSON.parse(localStorage.getItem('card') || '{}'))
  }

  return (
    <div
      className="modal-createcard"
      style={modulCreateCard ? { display: 'none' } : { display: 'flex' }}
    >
      <div className="modal-createcard__form">
        <button onClick={() => setmodulCreateCard(true)}>
          <img
            src={process.env.PUBLIC_URL + '/img/closeCreateCard.svg'}
            alt="close"
            style={{ width: '20px', height: '20px' }}
          />
        </button>
        <p className="modal-createcard__text">Вставте сыллку на картинку</p>
        <input
          name="urlImg"
          className="modal-createcard__input"
          type="text"
          value={cardInput.urlImg}
          onChange={(e) => setCardInput({ ...cardInput, urlImg: e.target.value })}
        />
        <p className="modal-createcard__text">Введите название</p>
        <input
          name="title"
          type="text"
          className="modal-createcard__input"
          value={cardInput.title}
          onChange={(e) => setCardInput({ ...cardInput, title: e.target.value })}
          required
        />
        <p className="modal-createcard__text">Введите уникальный штрихкод</p>
        <input
          name="barcode"
          type="number"
          className="modal-createcard__input"
          value={cardInput.barcode}
          onChange={(e) => setCardInput({ ...cardInput, barcode: e.target.value })}
          required
        />
        <p className="modal-createcard__text">Введите производителя</p>
        <input
          name="manufacturer"
          type="text"
          className="modal-createcard__input"
          value={cardInput.manufacturer}
          onChange={(e) => setCardInput({ ...cardInput, manufacturer: e.target.value })}
          required
        />
        <p className="modal-createcard__text">Введите бренд</p>
        <input
          name="brand"
          type="text"
          className="modal-createcard__input"
          value={cardInput.brand}
          onChange={(e) => setCardInput({ ...cardInput, brand: e.target.value })}
          required
        />
        <p className="modal-createcard__text">Введите описание</p>
        <input
          name="description"
          type="text"
          className="modal-createcard__input"
          value={cardInput.description}
          onChange={(e) => setCardInput({ ...cardInput, description: e.target.value })}
          required
        />
        <p className="modal-createcard__text">Введите цену</p>
        <input
          name="price"
          type="number"
          className="modal-createcard__input"
          value={cardInput.price}
          onChange={(e) => setCardInput({ ...cardInput, price: e.target.value })}
          required
        />
        <p className="modal-createcard__text">
          Выберите тип ухода(не обязательно)
        </p>
        {checkboxGroupOptions.map((item, index) => (
          <div style={{ display: 'flex', gap: '10px' }} key={index}>
            {item.entities.map((label, index) => (
              <CheckboxGroup
                id={index.toString() + label}
                label={label}
                checkedBoxByGroup={checkedBoxByGroup}
                key={index}
                nameGroup={item.option.optionNameOnBackend}
                onChange={handleChangeCheckedBoxGroup}
              />
            ))}
          </div>
        ))}

        <p className="modal-createcard__text">Введите обьем или вес</p>
        <input
          type="text"
          className="modal-createcard__input"
          value={cardInput.size}
          onChange={(e) => setCardInput({ ...cardInput, size: e.target.value })}
          required
        />
      
        <button
          className="modal-createcard__btn"
          type="button"
          // value={price}
          onClick={addNewCard}
        >
          Создать карточку
        </button>
      </div>
    </div>
  )
}

export default CreateCard
