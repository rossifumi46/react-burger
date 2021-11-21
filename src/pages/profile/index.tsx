import styles from "./styles.module.css";
import { useState, useRef, useEffect, useMemo, ChangeEvent, FormEvent } from "react";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Navigation from "../../components/navigation";
import { TUser, updateProfileRequest } from "../../services/slices/authSlice";
import { shallowEqual } from '../../utils';
import { useDispatch, useSelector } from "../../services/store";

type TProfile = TUser & { password?: string };

function ProfilePage() {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((store) => store.auth);
  const [state, setState] = useState<TProfile>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) setState(state => ({ ...user, password: state.password}));
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onIconClick = (ref: React.RefObject<HTMLInputElement>) => () => {
    ref.current && ref.current.name === 'name' ? setNameDisabled(false) : setPasswordDisabled(false);
    setTimeout(() => ref.current && ref.current.focus(), 0);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(updateProfileRequest({ token: accessToken, body: state }))
  }

  const isChanged = useMemo(() => user && (!shallowEqual(state, user) || state.password), [state, user]);

  const [nameDisabled, setNameDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);

  if (!user) return null;

  return (
    <>
      <main className={[styles.profile, "main mt-30"].join(" ")}>
        <Navigation location="profile" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            value={state.name}
            onChange={handleChange}
            name={"name"}
            placeholder="Имя"
            icon="EditIcon"
            type="text"
            ref={nameRef}
            disabled={nameDisabled}
            onIconClick={onIconClick(nameRef)}
            onBlur={() => setNameDisabled(true)}
          />
          <div className="mt-6">
            <EmailInput
              value={state.email}
              onChange={handleChange}
              name={"email"}
            />
          </div>
          <div className="mt-6">
            <Input
              value={state.password || ''}
              onChange={handleChange}
              name={"password"}
              onIconClick={onIconClick(passwordRef)}
              icon="EditIcon"
              placeholder="Пароль"
              type="password"
              ref={passwordRef}
              disabled={passwordDisabled}
              onBlur={() => setPasswordDisabled(true)}
            />
          </div>
          {isChanged && (
            <div className={[styles.buttons, "mt-6"].join(" ")}>
              <Button onClick={() => setState(user)} type="secondary">Отмена</Button>
              <Button>Сохранить</Button>
            </div>
          )}
        </form>
      </main>
    </>
  );
}

export default ProfilePage;
