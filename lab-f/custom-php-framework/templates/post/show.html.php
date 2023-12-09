<?php

/** @var \App\Model\Post $post */
/** @var \App\Service\Router $router */

$title = "{$post->getName()} ({$post->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $post->getName() ?></h1>
    <h2><?= $post->getSurname();?></h2>
    <article>
        <?= $post->getDescription();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('post-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('post-edit', ['id'=> $post->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
