import useGoogleLogin from '../../hooks/useGoogleLogin';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../lib/firebase';
import { useForm } from 'react-hook-form';
import { htmlEscaper } from '../../lib/clientSideUtils';

type formValues = {
    content: string;
};

const CommentForm = ({ slug }) => {
    const { currentUser, login, logout, isAuthLoading } = useGoogleLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleAddComment = (data: formValues) => {
        if (!currentUser) return;
        addDoc(collection(firestore, 'comments'), {
            slug: slug,
            time: serverTimestamp(),
            content: htmlEscaper(data.content),
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleAddComment)}>
                <input
                    className="text-black"
                    {...register('content', { required: true, minLength: 20 })}
                />
                {errors.content && 'Content is required'}

                <button className="bg-slate-300 text-orange-600" type="submit">
                    Done
                </button>
            </form>

            <span>{JSON.stringify(currentUser)}</span>
            <button disabled={isAuthLoading} onClick={login}>
                Login
            </button>
            <button disabled={isAuthLoading} onClick={logout}>
                Logout
            </button>
        </>
    );
};

export default CommentForm;
